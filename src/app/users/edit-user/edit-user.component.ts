import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id_usuario: new FormControl(this.data.id_usuario),
      usuario: new FormControl(this.data.usuario, Validators.required),
      password: new FormControl(this.data.password, [Validators.required]),
      nombre_publico: new FormControl(this.data.nombre_publico, Validators.required),
    });
  }

  async confirmEdit() {
    if (this.userForm.valid) {
      const editedUser = this.userForm.value as User;
      const response = await this.usersService.editUser(editedUser).toPromise();
      if (response && response.ok && response?.message) {
        this.snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: true, data: response.data });
      } else {
        this.snackBar.open('Error al editar el usuario', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
