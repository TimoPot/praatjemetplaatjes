import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lmz-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly text = input.required<string>();
  readonly src = input.required<string>();
  readonly id = input<number>();
  readonly category = input<string>();

  readonly enounce = output<string>();

  private router = inject(Router);

  navigateIntoCategory(id: number) {
    debugger;
    this.router.navigate(['main/category', id]);
  }
}
