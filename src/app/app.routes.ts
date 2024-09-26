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
    path: 'collection',
    loadComponent: () => import('./boardgame/boardgame-collection/boardgame-collection.component').then(m => m.BoardgameCollectionComponent)
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
