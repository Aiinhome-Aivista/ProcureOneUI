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
        path: 'profile',
        loadComponent: () => import('./shared/components/profile/profile.component').then(m => m.ProfileComponent)
      }
    ]
  },
  {
    path: 'manager',
    component: LayoutComponent,
    canActivate: [authGuard, roleGuard(['manager'])],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/manager/dashboard/manager-dashboard').then(m => m.ManagerDashboardComponent)
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
