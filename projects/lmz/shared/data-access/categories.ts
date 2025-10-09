import { Category } from '../interfaces/category';

export const CategoriesData = [
  {
    id: 1,
    isMainCategory: true,
    category: 'alledaagse dingen',
    text: 'Alle daagse dingen',
    src: './images/huis.jpg',
    subCategories: [2],
  } as Category,
  {
    id: 2,
    isMainCategory: false,
    category: 'huis',
    text: 'Huis',
    src: './images/boom.jpg',
    subCategories: [3, 4],
  } as Category,

  {
    id: 3,
    isMainCategory: false,
    category: 'keuken',
    text: 'Keuken',
    src: './images/keuken.png',
  } as Category,

  {
    id: 4,
    isMainCategory: false,
    category: 'woonkamer',
    text: 'Woonkamer',
    src: './images/woonkamer.png',
  } as Category,

  {
    id: 5,
    isMainCategory: true,
    category: 'natuur',
    text: 'Natuur',
    src: './images/natuur.webp',
    subCategories: [6],
  } as Category,

  {
    id: 6,
    isMainCategory: false,
    category: 'water',
    text: 'Water',
    src: './images/water.png',
  } as Category,
];
