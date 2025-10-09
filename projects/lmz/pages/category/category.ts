import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cards } from 'projects/lmz/components/cards/cards';
import { CategoriesService } from 'projects/lmz/shared/data-access/categories-service';

@Component({
  selector: 'lmz-category',
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cards],
})
export class Category {
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);

  constructor() {
    // Access route parameters from snapshot
    const selected = this.route.snapshot.paramMap.get('id');
    this.categoriesService.select$.next(
      selected ? Number(selected) : undefined
    );
  }

  data = signal([]);
}
