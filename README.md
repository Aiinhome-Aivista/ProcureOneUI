# ProciourOne - Enterprise Procurement Management System

A modern, scalable Angular 20 application built with best practices and advanced features.

## 🚀 Features

### Architecture
- **Standalone Components**: Fully standalone architecture without NgModules
- **Signals**: Modern reactive state management using Angular Signals
- **Lazy Loading**: Route-based code splitting for optimal performance
- **Guard-Based Security**: Role-based access control with functional guards
- **HTTP Interceptors**: Centralized authentication and error handling

### Technology Stack
- **Angular 20**: Latest version with cutting-edge features
- **TypeScript**: Strict mode enabled for type safety
- **Tailwind CSS**: Utility-first CSS framework
- **RxJS**: Reactive programming for async operations
- **Material Icons**: Beautiful, accessible icons

### Module Structure
1. **Vendor Module**: Product management, orders, and analytics
2. **Department Module**: Request management, approvals, and reporting
3. **Admin Module**: System administration, user management, and settings

## 🔐 Authentication

### Demo Credentials

| Role       | Email                    | Password   |
|------------|--------------------------|------------|
| Vendor     | vendor@example.com       | vendor123  |
| Department | department@example.com   | dept123    |
| Admin      | admin@example.com        | admin123   |

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## 🎯 Best Practices Implemented

### TypeScript
- ✅ Strict type checking enabled
- ✅ Type inference for cleaner code
- ✅ No `any` types used

### Angular
- ✅ Standalone components (no NgModules)
- ✅ Signals for state management
- ✅ `input()` and `output()` functions
- ✅ OnPush change detection strategy
- ✅ Native control flow (`@if`, `@for`, `@switch`)
- ✅ Functional guards and interceptors
- ✅ Route-based lazy loading

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

**Note**: This is a demonstration project with mock authentication. Replace mock services with actual API calls in production.
