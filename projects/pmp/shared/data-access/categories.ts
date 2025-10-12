import { Category } from '../interfaces/category';

export const CategoriesData = [
  {
    id: 1,
    isMainCategory: true,
    name: 'alledaagse dingen',
    text: 'Alle daagse dingen',
    src: './images/dingen.jpg',
    subCategories: [2, 5],
  } as Category,
  {
    id: 2,
    isMainCategory: false,
    name: 'huis',
    text: 'Huis',
    src: './images/huis.jpg',
    subCategories: [3, 4],
  } as Category,

  {
    id: 3,
    isMainCategory: false,
    name: 'keuken',
    text: 'Keuken',
    src: './images/keuken.jpg',
  } as Category,

  {
    id: 4,
    isMainCategory: false,
    name: 'woonkamer',
    text: 'Woonkamer',
    src: './images/woonkamer.jpg',
  } as Category,

  {
    id: 5,
    isMainCategory: true,
    name: 'natuur',
    text: 'Natuur',
    src: './images/natuur.webp',
    subCategories: [6, 7, 8],
  } as Category,
  {
    id: 6,
    isMainCategory: false,
    name: 'boom',
    text: 'Boom',
    src: './images/boom.jpg',
  } as Category,
  {
    id: 7,
    isMainCategory: false,
    name: 'berg',
    text: 'Berg',
    src: './images/berg.jpg',
  } as Category,
  {
    id: 8,
    isMainCategory: false,
    name: 'meer',
    text: 'Meer',
    src: './images/meer.jpg',
  } as Category,
];
