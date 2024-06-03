import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styles: [
  ]
})
export class Error404PageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Método para navegar al inicio o al login dependiendo del estado de autenticación del usuario
  navigate() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/moodshare/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
