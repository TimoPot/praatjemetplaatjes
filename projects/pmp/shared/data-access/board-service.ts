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

export interface BoardState {
  // Define the state properties for the board here
  allCards: Card[];
  selectedGroupCard?: Card;
  cardsToDisplay: Card[] | null;
  navigationStack?: number[][];
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
    const homeCard = this.state().allCards.find((card) => card.id === 0);
    if (!homeCard) return; // early exit

    this.state.update((state) => ({
      ...state,
      selectedGroupCard: homeCard,
      cardsToDisplay: this.getCardsToDisplay(homeCard),
      navigationStack: [...(state.navigationStack || []), [0]],
    }));
  }

  selectCard(cardId: number) {
    const selectedCard = this.state().allCards.find(
      (card) => card.id === cardId
    );

    this.state.update((state) => ({
      ...state,
      selectedGroupCard: selectedCard,
      cardsToDisplay: this.getCardsToDisplay(selectedCard),
      navigationStack: [
        ...(state.navigationStack || []),
        [selectedCard?.id || 0],
      ],
    }));
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

  private getCardsToDisplay(selectedCard?: Card): Card[] {
    const state = this.state();
    if (!state?.allCards || !selectedCard?.childrenIds?.length) {
      return [];
    }

    return state.allCards.filter((card) =>
      selectedCard?.childrenIds?.includes(card.id)
    );
  }
}
