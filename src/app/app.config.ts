import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { jwtInterceptor } from '@app/shared/interceptors/jwt.interceptor';
import { CheckForUpdateService } from '@app/shared/services/service-worker/check-for-update.service';
import { PromptUpdateService } from '@app/shared/services/service-worker/prompt-update.service';

import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    CheckForUpdateService,
    PromptUpdateService,
  ],
};
