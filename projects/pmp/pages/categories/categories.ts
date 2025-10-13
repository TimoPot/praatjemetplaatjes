import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  // Only show hoofd categories (= main categories)
  mainCategories = this.categoriesService.mainCategories;

  constructor() {
    // React to route parameter changes
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.setSelectedCategory(Number(id));
    });
  }

  /**
   * set the selected category id in the state
   */
  private setSelectedCategory(id: number) {
    console.log('Setting selected category to:', id);
    this.categoriesService.select$.next(id);
  }
}
