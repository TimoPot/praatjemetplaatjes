import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cards } from 'projects/lmz/components/cards/cards';

@Component({
  selector: 'lmz-categories',
  templateUrl: './categories.html',
  imports: [Cards],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories {
  data = signal([
    {
      category: 'alledaagse dingen',
      text: 'Alle daagse dingen',
      src: './images/huis.jpg',
    },
    { category: 'huis', text: 'Huis', src: './images/boom.jpg' },
    { category: 'keuken', text: 'Keuken', src: './images/auto.png' },
  ]);
}
