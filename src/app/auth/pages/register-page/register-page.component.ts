import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id_usuario: new FormControl(0),
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      nombre_publico: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async confirmAdd() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value as User;
      const response = await this.usersService.addUser(newUser).toPromise();
      if (response && response.ok) {
        console.log(response);

        this.snackBar.open("Usuario creado correctamente.", 'Cerrar', { duration: 5000 });
      } else {
        this.snackBar.open("Error al añadir al usuario.", 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Por favor complete el formulario correctamente', 'Cerrar', { duration: 5000 });
    }
  }
}
