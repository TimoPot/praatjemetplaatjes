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
  categories = signal([
    {
      id: 1,
      isHoofdCategory: true,
      category: 'alledaagse dingen',
      text: 'Alle daagse dingen',
      src: './images/huis.jpg',
      subCategorieen: [2],
    },
    {
      id: 2,
      isHoofdCategory: false,
      category: 'huis',
      text: 'Huis',
      src: './images/boom.jpg',
      subCategorieen: [3, 4],
    },
    {
      id: 3,
      isHoofdCategory: false,
      category: 'keuken',
      text: 'Keuken',
      src: './images/keuken.png',
    },
    {
      id: 4,
      isHoofdCategory: false,
      category: 'woonkamer',
      text: 'Woonkamer',
      src: './images/woonkamer.png',
    },
    {
      id: 5,
      isHoofdCategory: true,
      category: 'natuur',
      text: 'Natuur',
      src: './images/natuur.png',
      subCategorieen: [6],
    },
    {
      id: 6,
      isHoofdCategory: false,
      category: 'water',
      text: 'Water',
      src: './images/water.png',
    },
  ]);
}
