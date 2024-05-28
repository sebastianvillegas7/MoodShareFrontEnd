import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'users-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // rol: new FormControl(null, [Validators.required]),
    });
  }

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
