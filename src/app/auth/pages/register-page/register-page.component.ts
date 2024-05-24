import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  titulo = 'REGISTRO';

  registroForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  async register() {
    if (this.registroForm.valid) {
      const USER_DATA: User = this.registroForm.value as User;
      try {
        const RESPONSE = await this.authService.register(USER_DATA).toPromise();
        if (RESPONSE) {
          this.snackBar.open('¡Registro exitoso!', 'Cerrar', { duration: 6000 });
          this.router.navigate(['/login']);
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
    }
  }

}
