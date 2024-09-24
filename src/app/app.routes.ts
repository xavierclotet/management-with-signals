import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'boardgame/:id',
    loadComponent: () => import('./boardgame/boardgame-detail/boardgame-detail.component').then(m => m.BoardgameDetailComponent)
  },
  {
    path: 'hotness',
    loadComponent: () =>
      import('./boardgame/boardgame-page/boardgame-page.component').then(m => m.BoardgamePageComponent),
  },
  {
    path: '',
    redirectTo: '/hotness',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/hotness',
  },
];
