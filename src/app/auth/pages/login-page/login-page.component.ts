import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

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

  async setUserById() {
    let id_usuario = localStorage.getItem('id_usuario');
    try {
      if (id_usuario) {
        const RESPONSE = await this.usersService.getUserById(id_usuario).toPromise();
        if (RESPONSE) {
          this.usersService.currentUser = RESPONSE as User;
          localStorage.setItem('rol', this.usersService.currentUser.roles[0].name);
          localStorage.setItem('currentUser', JSON.stringify(this.usersService.currentUser)); // Guardar datos del usuario
        } else {
          console.error('No se pudo obtener el usuario por el id.');
        }
      } else {
        console.error('El id_usuario es nulo.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario por el id:', error);
    }
  }


  async login() {
    if (this.loginForm.valid) {
      const USER_DATA = this.loginForm.value;
      try {
        const RESPONSE = await this.authService.login({ email: USER_DATA.email, password: USER_DATA.password }).toPromise();

        if (RESPONSE.token) {
          this.setUserById();
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
