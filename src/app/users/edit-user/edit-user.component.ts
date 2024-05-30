import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-edit-user',
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

  }

  setForm() {
    this.editUserForm = this.formBuilder.group({
      id_usuario: [this.userData.id_usuario],
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // rol: new FormControl(null, [Validators.required]),
    });
  }

  async confirmEdit() {
    if (this.editUserForm.valid) {
      const EDITED_USER = this.editUserForm.value as User;
      try {
        const RESPONSE = await this.usersService.editUser(this.userData.id_usuario, EDITED_USER).toPromise();
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
