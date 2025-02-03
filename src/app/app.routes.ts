import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { HomeComponent } from './pages/home/home.component';
import { SlotsComponent } from './pages/slots/slots.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'games',
    title: 'Games',
    component: GamesComponent,
  },
  {
    path: 'games/slots',
    component: SlotsComponent,
  },
];
