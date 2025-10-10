import { LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'projects/pmp/shared/interfaces/category';

@Component({
  selector: 'pmp-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  standalone: true,
  imports: [LowerCasePipe],
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
