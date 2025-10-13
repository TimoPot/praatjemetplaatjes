import { Routes } from '@angular/router';
import { Board } from '@pages/board/board';

export const routes: Routes = [
  {
    path: 'board',
    component: Board,
  },
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: '**', component: Board },
];
