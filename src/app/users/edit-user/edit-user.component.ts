import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'users-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.editUserForm = this.formBuilder.group({
      id_usuario: [this.userData.id_usuario],
      email: [this.userData.email, [Validators.required, Validators.email]],
      name: [this.userData.name, Validators.required],
      apellido: [this.userData.apellido, Validators.required],
      password: [''],
      // rol: new FormControl(null, [Validators.required]),
    });
  }

  async confirmEdit() {
    if (this.editUserForm.valid) {
      // Extract the form values
      const formValue = this.editUserForm.value;

      // Create a new user object, excluding the password if it's not provided
      const EDITED_USER: User = {
        id_usuario: formValue.id_usuario,
        email: formValue.email,
        name: formValue.name,
        apellido: formValue.apellido,
        roles: this.userData.roles, // Include roles if needed
      };

      // Conditionally add the password field if it's provided
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
