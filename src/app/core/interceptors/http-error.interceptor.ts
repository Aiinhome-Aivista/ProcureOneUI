import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorNotificationService } from '../services';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errors = inject(ErrorNotificationService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        errors.notify(error);
      }

      return throwError(() => error);
    })
  );
};
