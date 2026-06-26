import { Routes } from '@angular/router';
import { RoleAGuard } from './core/guards/role.guard';
import { RoleBGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/tridify', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.HomeComponent) },
  { 
    path: 'table-grid', 
    loadComponent: () => import('./table-grid/table-grid').then(m => m.TableGridComponent),
    canActivate: [RoleAGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard-view/dashboard-view').then(m => m.DashboardViewComponent),
    canActivate: [RoleBGuard]
  },
  {
    path: 'tridify',
    loadComponent: () => import('./tridify-view/tridify-view').then(m => m.TridifyViewComponent)
  },
  {
    path: 'tridify/reviews/new',
    loadComponent: () =>
      import('./tridify-view/create-review/create-review').then(m => m.CreateReviewComponent)
  },
  {
    path: 'tridify/albums/:id',
    loadComponent: () =>
      import('./tridify-view/album-detail/album-detail').then(m => m.AlbumDetailComponent)
  },
  {
    path: 'tridify/explore',
    loadComponent: () =>
      import('./tridify-view/explore-view/explore-view').then(m => m.ExploreViewComponent)
  },
  {
    path: 'tridify/my-reviews',
    loadComponent: () =>
      import('./tridify-view/my-reviews/my-reviews').then(m => m.MyReviewsComponent)
  },
  {
    path: 'tridify/my-profile',
    loadComponent: () =>
      import('./tridify-view/my-profile/my-profile').then(m => m.MyProfileComponent)
  },
  {
    path: 'tridify/top-reviews',
    loadComponent: () =>
      import('./tridify-view/top-reviews/top-reviews').then(m => m.TopReviewsComponent)
  },
  { path: '**', redirectTo: '/tridify' }
];
