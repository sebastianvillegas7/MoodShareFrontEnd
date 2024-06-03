import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  canActivate(): boolean {
    // Verificar el rol del usuario
    if (this.authService.isAdmin()) {
      return true; // Permitir el acceso si el usuario tiene el rol de ADMIN
    } else {
      // Redirigir al usuario a una página no autorizada si no tiene el rol de ADMIN
      this.snackBar.open("No tiene acceso a esta ruta.", 'Cerrar', { duration: 8000 });
      this.router.navigate(['/moodshare/home']);
      return false;
    }
  }
}
