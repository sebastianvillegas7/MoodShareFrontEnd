import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  name: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register({ name: this.name, apellido: this.apellido, email: this.email, password: this.password }).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
