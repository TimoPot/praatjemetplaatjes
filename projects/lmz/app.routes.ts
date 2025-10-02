import { Routes } from '@angular/router';
import { Categories } from '@pages/categories/categories';
import { Category } from '@pages/category/category';
import { MainComponent } from '@pages/main/main.component';
import { Temp } from '@pages/temp/temp';

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  {
    path: 'temp',
    component: Temp,
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
  { path: '', redirectTo: '/temp/categories', pathMatch: 'full' },
  { path: '**', component: MainComponent },
];
