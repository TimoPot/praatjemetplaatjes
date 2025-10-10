import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoriesData } from './categories';
import { of, Subject } from 'rxjs';
import { Category } from '../interfaces/category';

export interface CategoriesState {
  selectedCategory?: number | undefined;
  allCategories: Category[];
  mainCategories: Category[];
  subCategoriesOfSelected?: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private destroyRef = inject(DestroyRef);

  // selectors
  allCategories = computed(() => this.state().allCategories);
  mainCategories = computed(() =>
    this.state().mainCategories.filter((c) => c.isMainCategory)
  );
  subCategoriesOfSelected = computed(
    () => this.state().subCategoriesOfSelected || []
  );

  // state
  private state = signal<CategoriesState>({
    selectedCategory: undefined,
    allCategories: [],
    mainCategories: [],
    subCategoriesOfSelected: [],
  });

  // sources
  select$ = new Subject<number | undefined>();
  private categories$ = of(CategoriesData);

  constructor() {
    // reducers
    // Update selected category
    this.select$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id: number | undefined) => {
        console.log('Selected category:', id);
        // get subcategories id's of selected category
        const subCategoriesIdsOfSelected = this.state().allCategories.filter(
          (c) => c.id === id
        )[0]?.subCategories;
        // get subcategories of selected subcategories id's
        const subCategoriesOfSelected = this.state().allCategories.filter((c) =>
          subCategoriesIdsOfSelected?.includes(c.id)
        );

        this.state.update((state) => ({
          ...state,
          selectedCategory: id,
          subCategoriesOfSelected: subCategoriesOfSelected,
        }));
      });

    // Load categories
    this.categories$
      .pipe(takeUntilDestroyed(this.destroyRef))
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
