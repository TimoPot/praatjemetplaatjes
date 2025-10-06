import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lmz-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  imports: [RouterLink],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly text = input.required<string>();
  readonly src = input.required<string>();

  readonly category = input<string>();

  readonly enounce = output<string>();
}
