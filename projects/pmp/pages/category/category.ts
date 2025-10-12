import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cards } from 'projects/pmp/components/cards/cards';
import { CategoriesService } from 'projects/pmp/shared/data-access/categories-service';

@Component({
  selector: 'pmp-category',
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cards],
})
export class Category {
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  // Only show hoofd categories (= main categories)
  subCategories = this.categoriesService.subCategoriesOfSelected;

  constructor() {
    // React to route parameter changes
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id > '0') {
        this.setSelectedCategory(Number(id));
      }
    });
  }

  /**
   * set the selected category id in the state
   */
  private setSelectedCategory(id: number | undefined) {
    console.log('Setting selected category to:', id);
    this.categoriesService.select$.next(id ? Number(id) : 0);
  }
}
