import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

/**
 * HTTP Interceptor to show/hide global loader for all HTTP requests
 * Automatically tracks active requests and manages loader visibility
 */
export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  // Show loader when request starts
  loaderService.show();
  
  // Hide loader when request completes (success or error)
  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  );
};
