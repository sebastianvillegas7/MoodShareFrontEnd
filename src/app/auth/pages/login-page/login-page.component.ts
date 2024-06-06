import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

/**
 * Componente para el de inicio de sesión.
 */
@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  titulo = 'LOG IN';

  loginForm!: FormGroup;

  /**
   * Constructor del componente de inicio de sesión.
   *
   * @param authService El servicio de autenticación.
   * @param router El enrutador para la navegación.
   * @param formBuilder El constructor de formularios reactivos.
   * @param snackBar El servicio de snack bar para mostrar notificaciones.
   * @param usersService El servicio de usuarios para obtener información del usuario.
   */
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

  /**
   * Configura el formulario de inicio de sesión con validaciones.
   */
  setForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Establece el usuario actual en base al ID almacenado en localStorage.
   */
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

  /**
   * Maneja el proceso de inicio de sesión.
   */
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
          this.snackBar.open('Error al iniciar sesión.', 'Cerrar', { duration: 6000 });
        }
      }
    }
  }
}
