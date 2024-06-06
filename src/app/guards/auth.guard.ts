import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Servicio de guardia para proteger
 * las rutas que requieren autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  /**
   * Constructor del servicio AuthGuard.
   *
   * @param authService El servicio de autenticación.
   * @param router El enrutador para la navegación.
   */
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  /**
   * Método canActivate que determina si una ruta puede ser activada.
   *
   * @returns true si el usuario está autenticado, de lo contrario redirige al login.
   */
  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al login si el usuario no está autenticado
    }

    return isAuthenticated;
  }
}
