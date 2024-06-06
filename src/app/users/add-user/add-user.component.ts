import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

/**
 * Componente para agregar un nuevo usuario.
 */
@Component({
  selector: 'users-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup; // Formulario para agregar usuario

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al cuadro de diálogo
   * @param snackBar Servicio para mostrar mensajes emergentes
   * @param formBuilder Constructor de formularios reactivos
   * @param usersService Servicio para gestionar usuarios
   * @param data Datos inyectados al componente
   */
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Al inicializar el componente configura el formulario de adición de un usuario.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Configurar el formulario de adición de un usuario.
   */
  setForm() {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * Método para confirmar la adición de un nuevo usuario.
   * Si el formulario es válido, agrega el usuario al servidor.
   */
  async confirmAdd() {
    if (this.addUserForm.valid) {
      const NEW_USER = this.addUserForm.value as User;
      try {
        const RESPONSE = await this.usersService.addUser(NEW_USER).toPromise();
        if (RESPONSE) {
          this.snackBar.open("Usuario creado correctamente.", 'Cerrar', { duration: 5000 });
          this.dialogRef.close({ ok: true, data: RESPONSE.data });
        } else {
          this.snackBar.open("Error al añadir al usuario.", 'Cerrar', { duration: 5000 });
        }
      } catch (error: any) {
        if (error.status === 409) {
          this.snackBar.open(error.error, 'Cerrar', { duration: 6000 });
        } else {
          this.snackBar.open('Error al registrarse', 'Cerrar', { duration: 6000 });
        }
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
