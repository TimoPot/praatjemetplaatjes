import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Cards } from 'projects/lmz/components/cards/cards';
import { CategoriesData } from 'projects/lmz/shared/data-access/categories';
import { CategoriesService } from 'projects/lmz/shared/data-access/categories-service';

@Component({
  selector: 'lmz-categories',
  templateUrl: './categories.html',
  imports: [Cards],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  private categoryService = inject(CategoriesService);

  // Only show hoofd categories (= main categories)
  mainCategories = this.categoryService.mainCategories;
}
