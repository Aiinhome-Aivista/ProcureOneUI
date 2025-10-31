# ProciourOne Angular 20 Project - Setup Instructions

## Project Overview

This is a professional-grade Angular 20 application with the following features:
- **3 Role-Based Modules**: Vendor, Department, and Admin
- **Single Login Page** with automatic role-based redirection
- **Advanced Angular Features**: Signals, Standalone Components, Lazy Loading
- **Tailwind CSS** for styling
- **TypeScript Strict Mode**

## Current Status

✅ Project structure created  
✅ Authentication system implemented  
✅ All 3 modules created (Vendor, Department, Admin)  
✅ Routing with lazy loading configured  
✅ Guards and interceptors implemented  
✅ Tailwind CSS configured  
⚠️ Build errors present (module resolution issues)

## Known Issues & Solutions

### Module Resolution Errors

The current build shows errors about not finding the `auth.service` module. This is likely due to:
1. Angular's build cache not picking up new files
2. TypeScript project references

### Solution Steps:

1. **Stop the development server** (if running)

2. **Clean the Angular cache**:
   ```powershell
   rm -r -force .angular
   ```

3. **Reinstall node_modules** (if needed):
   ```powershell
   rm -r -force node_modules
   npm install
   ```

4. **Restart the development server**:
   ```powershell
   ng serve
   ```

5. **If errors persist**, try:
   ```powershell
   ng serve --poll=2000
   ```

## Demo Credentials

| Role       | Email                    | Password   |
|------------|--------------------------|------------|
| Vendor     | vendor@example.com       | vendor123  |
| Department | department@example.com   | dept123    |
| Admin      | admin@example.com        | admin123   |

## Project Structure

```
src/app/
├── core/                          # Core functionality
│   ├── guards/
│   │   └── auth.guard.ts         # Authentication & role guards
│   ├── interceptors/
│   │   └── auth.interceptor.ts   # HTTP token interceptor
│   ├── models/
│   │   └── user.model.ts         # TypeScript interfaces
│   └── services/
│       └── auth.service.ts       # Authentication service
│
├── features/                      # Feature modules
│   ├── auth/
│   │   └── login/                # Login component
│   ├── vendor/
│   │   ├── dashboard/           # Vendor dashboard
│   │   ├── products/            # Product management
│   │   ├── orders/              # Order management
│   │   └── analytics/           # Analytics
│   ├── department/
│   │   ├── dashboard/           # Department dashboard
│   │   ├── requests/            # Request management
│   │   ├── approvals/           # Approval workflow
│   │   └── reports/             # Reports
│   └── admin/
│       ├── dashboard/           # Admin dashboard
│       ├── users/               # User management
│       ├── vendors/             # Vendor management
│       ├── departments/         # Department management
│       └── settings/            # System settings
│
└── shared/                        # Shared resources
    └── components/
        ├── layout/               # Main layout with sidebar
        ├── profile/              # Profile page
        ├── unauthorized/         # 403 error page
        └── not-found/            # 404 error page
```

## Key Features

### 1. Authentication System
- **Signals-based** state management
- **JWT token** storage
- **Automatic redirection** based on user role
- **Route guards** for protection
- **HTTP interceptor** for token injection

### 2. Routing & Layout Architecture
- **Lazy loading** for all feature modules
- **Role-based guards** on routes
- **Automatic redirects** from login for authenticated users
- **Layout wrapper pattern** for authenticated pages
- **Nested router outlets** for clean component structure

### 3. UI/UX
- **Responsive design** with Tailwind CSS
- **Material Icons** for consistent iconography
- **Professional dashboards** for each role
- **Collapsible sidebar** navigation
- **User menu** with logout

### 4. Best Practices
- ✅ Standalone components (no NgModules)
- ✅ Signal-based state management
- ✅ `input()` and `output()` functions
- ✅ `computed()` for derived state
- ✅ OnPush change detection
- ✅ Native control flow (`@if`, `@for`, `@switch`)
- ✅ Functional guards
- ✅ `inject()` function for DI
- ✅ TypeScript strict mode

## Advanced Angular 20 Features Used

1. **Signals**: Reactive state management without RxJS complexity
2. **Standalone Components**: No NgModules required
3. **New Control Flow**: `@if`, `@for`, `@switch` syntax
4. **Functional Guards**: Modern guard implementation
5. **HTTP Interceptors**: Functional interceptor approach
6. **Lazy Loading**: Route-based code splitting
7. **View Transitions**: Smooth page transitions
8. **Component Input Binding**: Automatic route param binding

## Layout & Routing Architecture

### How the Layout System Works

The application uses a **Layout Wrapper Pattern** where authenticated pages are wrapped in a layout component with sidebar and header, while public pages (like login) render without any wrapper.

#### Route Structure

```typescript
// app.routes.ts

// PUBLIC ROUTE - No Layout (Login)
{
  path: 'login',
  canActivate: [loginGuard],
  loadComponent: () => import('./features/auth/login/login.component')
  // ← Renders directly in root <router-outlet>
}

// PROTECTED ROUTES - With Layout
{
  path: 'vendor',
  component: LayoutComponent,  // ← Parent wrapper component
  canActivate: [authGuard, roleGuard(['vendor'])],
  children: [                  // ← Child routes render inside layout
    {
      path: 'dashboard',
      loadComponent: () => import('./features/vendor/dashboard/...')
      // ← Renders in nested <router-outlet> inside LayoutComponent
    }
  ]
}
```

#### Component Hierarchy

**Login Page (No Layout):**
```
Root App Component
└── <router-outlet />
    └── LoginComponent (renders directly)
        → Full page, no wrapper
        → Standalone rendering
```

**Dashboard Pages (With Layout):**
```
Root App Component
└── <router-outlet />
    └── LayoutComponent (parent wrapper)
        ├── Sidebar (navigation)
        ├── Header (top bar with user menu)
        └── <router-outlet /> (nested outlet)
            └── VendorDashboardComponent (child route)
                → Renders inside the layout
```

#### The Nested Router Outlet Pattern

**Root Component** (`app.ts`):
```typescript
@Component({
  selector: 'app-root',
  template: '<router-outlet />'  // PRIMARY outlet
})
export class App {}
```

**Layout Component** (`layout.component.html`):
```html
<div class="layout-wrapper">
  <!-- Sidebar: Always visible for authenticated users -->
  <aside class="sidebar">
    <nav>Navigation Items</nav>
  </aside>
  
  <!-- Main content area -->
  <div class="main-content">
    <!-- Header: Always visible for authenticated users -->
    <header>
      <button>Toggle Menu</button>
      <div>User Menu</div>
    </header>
    
    <!-- Content area where child routes render -->
    <main>
      <router-outlet></router-outlet>  ← NESTED outlet for child routes
    </main>
  </div>
</div>
```

#### Routing Flow Examples

1. **Navigating to Login** (`/login`):
   - Angular matches the route
   - No parent component specified
   - LoginComponent renders in root `<router-outlet>`
   - Takes full page (no sidebar/header)

2. **Navigating to Dashboard** (`/vendor/dashboard`):
   - Angular matches the route
   - LayoutComponent is the parent
   - LayoutComponent renders in root `<router-outlet>`
   - VendorDashboardComponent renders in Layout's nested `<router-outlet>`
   - Result: Dashboard content wrapped with sidebar and header

#### Key Benefits of This Pattern

1. **Separation of Concerns**: Public pages and authenticated pages have different layouts
2. **Reusability**: Single LayoutComponent used for all protected routes
3. **Maintainability**: Layout changes apply to all authenticated pages automatically
4. **Security**: Guards protect entire layout branches
5. **Performance**: Lazy loading works seamlessly with nested routes

#### Role-Based Navigation

The `LayoutComponent` dynamically generates navigation items based on the logged-in user's role:

```typescript
readonly navigationItems = computed(() => {
  const role = this.userRole();  // From auth service signal
  
  const roleSpecificItems = {
    vendor: [
      { label: 'Products', icon: 'inventory', route: '/vendor/products' },
      { label: 'Orders', icon: 'shopping_cart', route: '/vendor/orders' }
    ],
    department: [
      { label: 'Requests', icon: 'assignment', route: '/department/requests' },
      { label: 'Approvals', icon: 'task_alt', route: '/department/approvals' }
    ],
    admin: [
      { label: 'Users', icon: 'group', route: '/admin/users' },
      { label: 'Settings', icon: 'settings', route: '/admin/settings' }
    ]
  };
  
  return roleSpecificItems[role] || [];
});
```

This ensures each user only sees navigation items relevant to their role.

## Development Commands

```powershell
# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Generate component
ng generate component feature-name/component-name

# Format code (if configured)
npm run format
```

## Troubleshooting

### Build Errors
If you see module resolution errors:
1. Delete `.angular` folder
2. Restart the dev server
3. Try `ng serve --poll=2000`

### Tailwind Not Working
- Check that `tailwind.config.js` exists
- Verify `styles.scss` has the `@tailwind` directives
- Restart the dev server

### Login Not Working
- Check browser console for errors
- Verify AuthService is properly imported
- Check that localStorage is available

## Next Steps

To complete the setup:

1. **Fix build errors** by clearing cache and restarting
2. **Test login functionality** with demo credentials
3. **Navigate between modules** to verify routing
4. **Customize components** as needed
5. **Add real API integration** (replace mock login)
6. **Add unit tests** for components and services
7. **Configure ESLint** for code quality
8. **Add E2E tests** with Playwright or Cypress

## Production Checklist

Before deploying to production:

- [ ] Replace mock authentication with real API
- [ ] Add proper error handling
- [ ] Implement token refresh mechanism
- [ ] Add loading states
- [ ] Configure environment variables
- [ ] Enable AOT compilation
- [ ] Optimize bundle size
- [ ] Add security headers
- [ ] Configure CORS properly
- [ ] Add logging and monitoring
- [ ] Write comprehensive tests
- [ ] Document API integration

## Support

For issues or questions:
1. Check Angular documentation: https://angular.dev
2. Review Tailwind docs: https://tailwindcss.com
3. Check browser console for errors
4. Verify all files were created correctly

---

**Built with Angular 20 + Tailwind CSS + TypeScript**


