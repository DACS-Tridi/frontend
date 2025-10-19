import { Routes } from '@angular/router';
import { RoleAGuard } from './core/guards/role.guard';
import { RoleBGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: '**', redirectTo: '/home' }
];
