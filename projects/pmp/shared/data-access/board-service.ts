import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { Card } from '../interfaces/card';
import { CardsData } from './cards-data';
import { of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type navigationStackTuple = [
  id: number,
  name: string,
  childrenIdsOfParent: number[],
];

export interface BoardState {
  // Define the state properties for the board here
  allCards: Card[];
  selectedGroupCard?: Card;
  cardsToDisplay: Card[] | null;
  navigationStack?: navigationStackTuple[]; // TODO move to other state???
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private destroyRef = inject(DestroyRef);

  // SELECTORS
  // Define computed selectors based on the state here
  readonly allCards = computed(() => this.state().allCards);
  readonly selectedGroupCard = computed(() => this.state().selectedGroupCard);
  readonly cardsToDisplay = computed(() => this.state().cardsToDisplay);
  readonly navigationStack = computed(() => this.state().navigationStack);
  readonly selectedLinkCards = computed(() => {
    const ids = this.state().selectedGroupCard?.linkIds;
    if (!ids) return [];
    return this.state().allCards.filter((card) => ids.includes(card.id));
  });

  // STATE
  private state = signal<BoardState>({
    // Initialize the state properties here
    allCards: [],
    selectedGroupCard: undefined,
    cardsToDisplay: [],
    navigationStack: [],
  });

  // SOURCES
  // Define any sources of data or events here
  private allCards$ = of(CardsData);

  // ACTIONS/METHODS
  // Define any actions or methods that modify the state here
  selectHome() {
    const homeCard = this.getCardByID(0);
    if (!homeCard) return; // early exit

    this.state.update((state) => ({
      ...state,
      selectedGroupCard: homeCard,
      cardsToDisplay: this.getCardsToDisplay(homeCard),
      navigationStack: [[0, homeCard.name, []]],
    }));
  }

  selectGroupCard(cardId: number) {
    const selectedGroupCard = this.getCardByID(cardId);
    if (!selectedGroupCard) return; // early exit

    const ids = this.getChildrenIDsOfCard(selectedGroupCard.parentId) || [];

    this.state.update((state) => ({
      ...state,
      selectedGroupCard: selectedGroupCard,
      cardsToDisplay: this.getCardsToDisplay(selectedGroupCard),
      navigationStack: [
        ...(state.navigationStack || []),
        [selectedGroupCard!.id, selectedGroupCard!.name, ids],
      ],
    }));
  }

  selectLevel(cardId: number, level: number) {
    const selectedCard = this.getCardByID(cardId);
    if (!selectedCard) return; // early exit

    const newNavStack = this.state().navigationStack?.slice(0, level + 1);

    this.state.update((state) => ({
      ...state,
      selectedGroupCard: selectedCard,
      cardsToDisplay: this.getCardsToDisplay(selectedCard),
      navigationStack: newNavStack,
    }));
  }

  selectSibling(cardId: number) {
    console.log(`TODO`);
  }

  constructor() {
    // Load initial data into the state
    this.allCards$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cards) => {
        this.state.update((state) => ({ ...state, allCards: cards }));
      });

    // EFFECTS
    // Define any side effects or reactions to state changes here
    effect(() => {
      console.log('Categories state changed:', this.state());
    });
  }

  private getCardByID(cardId: number): Card | undefined {
    const state = this.state();
    if (!state?.allCards?.length) {
      return undefined;
    }

    return state.allCards.find((card) => card.id === cardId);
  }

  private getCardsToDisplay(selectedCard?: Card): Card[] {
    const state = this.state();
    if (!state?.allCards || !selectedCard?.childrenIds?.length) {
      return [];
    }

    return state.allCards.filter((card) =>
      selectedCard?.childrenIds?.includes(card.id),
    );
  }

  private getChildrenIDsOfCard(parentId: number | null) {
    if (parentId === null) return []; //early return

    return this.getCardByID(parentId)?.childrenIds;
  }
}
