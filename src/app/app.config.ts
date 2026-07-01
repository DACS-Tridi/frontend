import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';
import { keycloakInitOptions } from './core/config/keycloak.config';

import { routes } from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    // Inicializa Keycloak con las opciones de configuración
    return keycloak.init(keycloakInitOptions).catch((error) => {
      console.error('Error en Keycloak:', error);
      return Promise.resolve();
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
};
