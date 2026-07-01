import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';

/**
 * Guard para verificar roles específicos
 * protege rutas que requieren ciertos roles.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return new Observable(observer => {
      if (!this.keycloakService.isLoggedIn()) {
        // El login de Keycloak es un redirect externo, no una ruta de Angular.
        this.keycloakService.login();
        observer.next(false);
        observer.complete();
        return;
      }

      const hasRequiredRole = this.keycloakService.hasAnyRole(['ROLE-A', 'ROLE-B']);

      if (hasRequiredRole) {
        observer.next(true);
      } else {
        observer.next(this.router.createUrlTree(['/unauthorized']));
      }

      observer.complete();
    });
  }
}

/**
 * Guard para verificar el rol ROLE-A
 * protege rutas que requieren especificamente ROLE-A.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleAGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return new Observable(observer => {
      if (!this.keycloakService.isLoggedIn()) {
        // El login de Keycloak es un redirect externo, no una ruta de Angular.
        this.keycloakService.login();
        observer.next(false);
        observer.complete();
        return;
      }

      const hasRequiredRole = this.keycloakService.hasAnyRole(['ROLE-A']);

      if (hasRequiredRole) {
        observer.next(true);
      } else {
        observer.next(this.router.createUrlTree(['/unauthorized']));
      }

      observer.complete();
    });
  }
}
