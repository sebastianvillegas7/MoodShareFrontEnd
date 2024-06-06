import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';

/**
 * Componente para eliminar un usuario.
 */
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al cuadro de diálogo
   * @param id_usuario ID del usuario a eliminar
   * @param usersService Servicio para gestionar usuarios
   * @param snackBar Servicio para mostrar mensajes emergentes
   */
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public id_usuario: string,
    private usersService: UsersService,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Cierra el cuadro de diálogo sin realizar ninguna acción.
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  /**
   * Método para confirmar la eliminación del usuario.
   * Intenta eliminar el usuario del servidor y muestra un mensaje de éxito o error.
   */
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
