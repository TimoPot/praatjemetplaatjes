import { computed, effect, Injectable, signal } from '@angular/core';
import { CategoriesData } from './categories';
import { of, Subject, takeUntil } from 'rxjs';
import { Category } from '../interfaces/category';

export interface CategoriesState {
  selectedCategory?: number | undefined;
  allCategories: Category[];
  mainCategories: Category[];
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
  select$ = new Subject<number | undefined>();
  private categories$ = of(CategoriesData);

  constructor() {
    // reducers
    // Update selected category
    this.select$.subscribe((id: number | undefined) => {
      console.log('Selected category:', id);
      this.state.update((state) => ({
        ...state,
        selectedCategory: id,
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
