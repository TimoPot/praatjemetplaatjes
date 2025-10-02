import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from '../card/card';

@Component({
  selector: 'lmz-cards',
  templateUrl: './cards.html',
  styleUrls: ['./cards.scss'],
  imports: [Card],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cards {
  cards = input.required<{ text: string; src: string }[]>();
}
