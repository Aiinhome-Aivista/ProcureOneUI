import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * HTTP Interceptor to add authentication token to requests
 * and handle authentication errors
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get token from service
  const token = authService.getToken();
  
  // Clone request and add authorization header if token exists
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;
  
  // Handle response and errors
  return next(authReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/login'], {
            queryParams: { returnUrl: router.url, reason: 'session_expired' }
          });
        }
        
        // Handle 403 Forbidden - insufficient permissions
        if (error.status === 403) {
          router.navigate(['/unauthorized']);
        }
      }
      
      return throwError(() => error);
    })
  );
};
