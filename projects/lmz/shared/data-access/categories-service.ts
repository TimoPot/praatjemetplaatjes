import { computed, effect, Injectable, signal } from '@angular/core';
import { CategoriesData } from './categories';
import { of, Subject, takeUntil } from 'rxjs';

export interface CategoriesState {
  selectedCategory?: string;
  allCategories: typeof CategoriesData;
  mainCategories: typeof CategoriesData;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // selectors
  allCategories = computed(() => this.state().allCategories);
  mainCategories = computed(() =>
    this.state().mainCategories.filter((c) => c.isMainCategory)
  );

  // state
  private state = signal<CategoriesState>({
    selectedCategory: undefined,
    allCategories: [],
    mainCategories: [],
  });

  // sources
  select$ = new Subject<string | undefined>();
  private categories$ = of(CategoriesData);

  constructor() {
    // reducers
    // Update selected category
    this.select$.subscribe((category) => {
      this.state.update((state) => ({
        ...state,
        selectedCategory: category,
      }));
    });

    // Load categories
    this.categories$
      //   .pipe(takeUntilDestroyed())
      .subscribe((categories) => {
        this.state.update((state) => ({
          ...state,
          allCategories: categories,
          mainCategories: categories.filter((c) => c.isMainCategory),
        }));
      });

    effect(() => {
      console.log('Categories state changed:', this.state());
    });
  }
}
