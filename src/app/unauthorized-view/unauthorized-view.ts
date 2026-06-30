import { Component } from '@angular/core';
import { KeycloakService } from '../core/services/keycloak.service';

@Component({
  selector: 'app-unauthorized-view',
  standalone: true,
  templateUrl: './unauthorized-view.html',
  styleUrls: ['./unauthorized-view.css']
})
export class UnauthorizedViewComponent {
  constructor(private keycloakService: KeycloakService) {}

  login(): void {
    this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }
}
