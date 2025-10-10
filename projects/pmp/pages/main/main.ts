import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesService } from 'projects/pmp/shared/data-access/categories-service';

@Component({
  selector: 'pmp-main',
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class Main {
  private categoriesService = inject(CategoriesService);

  title = 'Praatje met plaatjes';

  selectedCategory = this.categoriesService.selectedCategory;
}
