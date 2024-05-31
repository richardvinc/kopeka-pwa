import { switchMap, take } from 'rxjs';

import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  return authService.idToken$.pipe(
    take(1),
    switchMap((idToken) => {
      // Skip adding Authorization header if the request is to Azure Blob Storage
      if (req.url.includes('https://devkopekabucket.blob.core.windows.net')) {
        return next(req);
      }

      const headers = req.headers.set('Authorization', `Bearer ${idToken}`);

      return next(req.clone({ headers }));
    })
  );
};
