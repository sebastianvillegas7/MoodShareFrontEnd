import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Guardia que verifica si el usuario tiene el rol adecuado para acceder a una ruta.
 */
@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  /**
   * Constructor del servicio UserRoleGuard.
   *
   * @param authService El servicio de autenticación.
   * @param router El enrutador para la navegación.
   * @param snackBar El servicio de notificaciones.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  /**
   * Método canActivate que determina si una ruta puede ser activada según el rol del usuario.
   *
   * @returns true si el usuario tiene el rol de ADMIN, de lo contrario redirige y notifica al usuario.
   */
  canActivate(): boolean {
    // Verificar el rol del usuario
    if (this.authService.isAdmin()) {
      return true; // Permitir el acceso si el usuario tiene el rol de ADMIN
    } else {
      // Redirigir al usuario si no tiene el rol de ADMIN
      this.snackBar.open("No tiene acceso a esta ruta.", 'Cerrar', { duration: 8000 });
      this.router.navigate(['/moodshare/home']);
      return false;
    }
  }
}
