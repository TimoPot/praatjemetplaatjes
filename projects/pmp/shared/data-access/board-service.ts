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
  selectedCard?: Card;
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
  readonly selectedCard = computed(() => this.state().selectedCard);
  readonly cardsToDisplay = computed(() => this.state().cardsToDisplay);

  // STATE
  private state = signal<BoardState>({
    // Initialize the state properties here
    allCards: [],
    selectedCard: undefined,
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

    if (!homeCard) return;

    this.state.update((state) => ({
      ...state,
      selectedCard: undefined,
      cardsToDisplay: state.allCards.filter((card) =>
        homeCard.childrenIds?.includes(card.id)
      ),
      navigationStack: [...(state.navigationStack || []), [0]],
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
}
