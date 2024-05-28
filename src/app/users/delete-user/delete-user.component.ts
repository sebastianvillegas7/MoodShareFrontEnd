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
    @Inject(MAT_DIALOG_DATA) public id_usuario: string,
    private usersService: UsersService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    try {
      await this.usersService.deleteUser(this.id_usuario).toPromise();
      this.dialogRef.close({ ok: true });
      this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
    }
  }
}
