import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  titulo = 'LOG IN';

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private usersService: UsersService
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
      const USER_DATA = this.loginForm.value;
      try {
        const RESPONSE = await this.authService.login({ email: USER_DATA.email, password: USER_DATA.password }).toPromise();

        if (RESPONSE.token) {
          this.usersService.setUserById();
          this.router.navigate([`/moodshare/home`]);
          this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 6000 });
        }
      } catch (error: any) {
        if (error.status === 401) {
          this.snackBar.open("Usuario/contraseña incorrectos.", 'Cerrar', { duration: 6000 });
        } else {
          this.snackBar.open('Error', 'Cerrar', { duration: 6000 });
        }
      }
    }
  }
}
