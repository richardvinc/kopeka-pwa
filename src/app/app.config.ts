import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';

import { environment } from '../environments/environment.producton';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase))
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
