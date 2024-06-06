import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

/**
 * Componente para editar un usuario.
 */
@Component({
  selector: 'users-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al cuadro de diálogo
   * @param snackBar Servicio para mostrar mensajes emergentes
   * @param usersService Servicio para gestionar usuarios
   * @param formBuilder Constructor para crear instancias de FormGroup
   * @param userData Datos del usuario a editar
   */
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) { }

  /**
   * Al inicializar el componente se configura el formulario de edición.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Configura el formulario de edición con los datos del usuario.
   */
  setForm() {
    this.editUserForm = this.formBuilder.group({
      id_usuario: [this.userData.id_usuario],
      email: [this.userData.email, [Validators.required, Validators.email]],
      name: [this.userData.name, Validators.required],
      apellido: [this.userData.apellido, Validators.required],
      password: [''],
    });
  }

  /**
   * Método para confirmar la edición del usuario.
   * Valida el formulario y realiza la solicitud de edición al servidor.
   * Muestra mensajes de éxito o error.
   */
  async confirmEdit() {
    if (this.editUserForm.valid) {
      // Extrae los valores del formulario
      const formValue = this.editUserForm.value;

      // Crea un nuevo objeto de usuario, excluyendo la contraseña si no se proporciona
      const EDITED_USER: User = {
        id_usuario: formValue.id_usuario,
        email: formValue.email,
        name: formValue.name,
        apellido: formValue.apellido,
        roles: this.userData.roles, // Incluye roles si es necesario
      };

      // Agrega condicionalmente el campo de contraseña si se proporciona
      if (formValue.password) {
        EDITED_USER.password = formValue.password;
      }

      try {
        const RESPONSE = await this.usersService.editUser(this.userData.id_usuario, EDITED_USER).toPromise();
        if (RESPONSE) {
          this.snackBar.open("Usuario actualizado correctamente.", 'Cerrar', { duration: 5000 });
          localStorage.setItem('currentUser', JSON.stringify(EDITED_USER));
          this.dialogRef.close({ ok: true, data: RESPONSE.data });
        } else {
          this.snackBar.open("Error al actualizar al usuario.", 'Cerrar', { duration: 5000 });
        }
      } catch (error: any) {
        if (error.status === 409) {
          this.snackBar.open(error.error, 'Cerrar', { duration: 6000 });
        } else {
          this.snackBar.open('Error al actualizar el usuario', 'Cerrar', { duration: 6000 });
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
