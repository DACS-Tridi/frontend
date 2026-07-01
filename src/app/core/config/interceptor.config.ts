import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

/**
 * Configuración de interceptores HTTP
 * Incluye interceptores para manejo de errores y autenticación.
 */
export const INTERCEPTOR_CONFIG = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
];
