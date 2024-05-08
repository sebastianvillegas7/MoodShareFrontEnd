import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id_usuario: new FormControl(0),
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]),
      nombre_publico: new FormControl(null, Validators.required),
    });
  }

  async confirmAdd() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value as User;
      const response = await this.usersService.addUser(newUser).toPromise();
      if (response && response.ok) {
        console.log(response);

        this.snackBar.open("Usuario creado correctamente.", 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response.data });
      } else {
        this.snackBar.open("Error al añadir al usuario.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
