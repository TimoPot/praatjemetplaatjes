import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Cards } from 'projects/lmz/components/cards/cards';

@Component({
  selector: 'lmz-category',
  templateUrl: './category.html',
  styleUrls: ['./category.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Cards],
})
export class Category {
  data = signal([
    { text: 'Huis', src: './images/huis.jpg' },
    { text: 'Boom', src: './images/boom.jpg' },
    { text: 'Auto', src: './images/auto.png' },
  ]);
}
