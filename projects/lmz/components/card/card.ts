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

  readonly category = input<string>();

  readonly enounce = output<string>();

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  navigateIntoCategory(category: string) {
    this.router.navigate(['category', category]);
  }
}
