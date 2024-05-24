import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  titulo = 'LOG IN';

  loginForm!: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      const RESPONSE = await this.authService.login({ email: data.email, password: data.password }).toPromise();

      if (RESPONSE.token) {
        this.router.navigate([`/moodshare/home`]);
        this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 6000 });

        this.authService.userActual = data.email;
      } else {
        this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', { duration: 6000 });
      }
    }
  }
}
