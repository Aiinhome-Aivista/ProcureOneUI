import { Routes } from '@angular/router';
import { authGuard, loginGuard, roleGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'vendor',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['vendor'])],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/vendor/dashboard/vendor-dashboard.component').then(m => m.VendorDashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/vendor/products/products.component').then(m => m.ProductsComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/vendor/orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/vendor/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shared/components/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: 'department',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['department'])],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/department/dashboard/department-dashboard.component').then(m => m.DepartmentDashboardComponent)
      },
      {
        path: 'requests',
        loadComponent: () => import('./features/department/requests/requests.component').then(m => m.RequestsComponent)
      },
      {
        path: 'approvals',
        loadComponent: () => import('./features/department/approvals/approvals.component').then(m => m.ApprovalsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/department/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./shared/components/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
