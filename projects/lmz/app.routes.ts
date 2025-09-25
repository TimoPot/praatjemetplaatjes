import { Routes } from '@angular/router';
import { MainComponent } from '@pages/main/main.component';
import { Temp } from '@pages/temp/temp';

export const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'temp', component: Temp },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: MainComponent },
];
