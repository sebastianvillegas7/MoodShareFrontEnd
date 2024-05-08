import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private usersService: UsersService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.usersService.deleteUser(this.user.id_usuario).toPromise();

    if (RESPONSE && RESPONSE.message) { // Comprueba si RESPONSE y RESPONSE.message son definidos
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        this.snackBar.open(RESPONSE.message, 'Cerrar', { duration: 5000 });
      }
    } else {
      // Maneja el caso donde RESPONSE o RESPONSE.message son undefined
      // Por ejemplo, muestra un mensaje de error o realiza alguna acción adecuada
      console.error('RESPONSE o RESPONSE.message es undefined');
    }
  }
}
