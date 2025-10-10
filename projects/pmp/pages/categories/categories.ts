import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cards } from 'projects/pmp/components/cards/cards';
import { CategoriesService } from 'projects/pmp/shared/data-access/categories-service';

@Component({
  selector: 'pmp-categories',
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
