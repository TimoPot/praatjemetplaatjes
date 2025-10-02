import { Routes } from '@angular/router';
import { Categories } from '@pages/categories/categories';
import { Category } from '@pages/category/category';
import { Main } from '@pages/main/main';

export const routes: Routes = [
  {
    path: 'main',
    component: Main,
    children: [
      {
        path: 'categories',
        component: Categories,
      },
      {
        path: 'category',
        component: Category,
      },
    ],
  },
  { path: '', redirectTo: '/main/categories', pathMatch: 'full' },
  { path: '**', component: Main },
];
