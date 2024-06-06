import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/interfaces/user.interface';

/**
 * Componente para la página de registro.
 */
@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  titulo = 'REGISTRO';

  registroForm!: FormGroup;

  /**
   * Constructor del componente de registro.
   *
   * @param authService El servicio de autenticación.
   * @param router El enrutador para la navegación.
   * @param formBuilder El constructor de formularios reactivos.
   * @param snackBar El servicio de snack bar para mostrar notificaciones.
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Configura el formulario de registro con validaciones.
   */
  setForm() {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Maneja el proceso de registro de usuario.
   */
  async register() {
    if (this.registroForm.valid) {
      const USER_DATA: User = this.registroForm.value as User;
      try {
        const RESPONSE = await this.authService.register(USER_DATA).toPromise();
        if (RESPONSE) {
          this.snackBar.open('¡Registro exitoso! Inicie sesión', 'Cerrar', { duration: 6000 });
          this.router.navigate(['/login']); // Navega a la página de inicio de sesión tras registro exitoso
        } else {
          this.snackBar.open('Registro incorrecto', 'Cerrar', { duration: 6000 });
        }
      } catch (error: any) {
        if (error.status === 409) {
          // Si el error fue debido a que el usuario ya existe, mostrar el mensaje del backend
          this.snackBar.open(error.error, 'Cerrar', { duration: 6000 });
        } else {
          // En otros casos de error, mostrar un mensaje genérico
          this.snackBar.open('Error al registrarse', 'Cerrar', { duration: 6000 });
        }
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }
}
