import { Routes } from '@angular/router';
import { RoleAGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/tridify', pathMatch: 'full' },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./unauthorized-view/unauthorized-view').then(m => m.UnauthorizedViewComponent)
  },
  {
    path: 'tridify',
    loadComponent: () => import('./tridify-view/tridify-view').then(m => m.TridifyViewComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'tridify/reviews/new',
    loadComponent: () =>
      import('./tridify-view/create-review/create-review').then(m => m.CreateReviewComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'tridify/albums/:id',
    loadComponent: () =>
      import('./tridify-view/album-detail/album-detail').then(m => m.AlbumDetailComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'tridify/explore',
    loadComponent: () =>
      import('./tridify-view/explore-view/explore-view').then(m => m.ExploreViewComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'tridify/my-reviews',
    loadComponent: () =>
      import('./tridify-view/my-reviews/my-reviews').then(m => m.MyReviewsComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'tridify/my-profile',
    loadComponent: () =>
      import('./tridify-view/my-profile/my-profile').then(m => m.MyProfileComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'tridify/top-reviews',
    loadComponent: () =>
      import('./tridify-view/top-reviews/top-reviews').then(m => m.TopReviewsComponent),
    canActivate: [RoleAGuard]
  },
  { path: '**', redirectTo: '/tridify' }
];
