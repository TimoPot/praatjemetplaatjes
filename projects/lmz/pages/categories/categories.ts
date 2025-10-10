import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cards } from 'projects/lmz/components/cards/cards';
import { CategoriesService } from 'projects/lmz/shared/data-access/categories-service';

@Component({
  selector: 'lmz-categories',
  templateUrl: './categories.html',
  imports: [Cards],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  private categoriesService = inject(CategoriesService);

  // Only show hoofd categories (= main categories)
  mainCategories = this.categoriesService.mainCategories;
}
