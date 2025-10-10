import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'projects/lmz/shared/interfaces/category';

@Component({
  selector: 'lmz-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly category = input<Category>();

  readonly enounce = output<string>();

  private router = inject(Router);

  navigateIntoCategory(id: number) {
    this.router.navigate(['main/category', id]);
  }
}
