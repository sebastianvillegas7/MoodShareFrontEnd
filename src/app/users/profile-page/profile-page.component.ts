import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Overlay } from '@angular/cdk/overlay';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Componente para la página de perfil de usuario.
 */
@Component({
  selector: 'users-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al cuadro de diálogo actual
   * @param user Datos del usuario actual
   * @param router Router para la navegación entre páginas
   * @param dialog Servicio para abrir cuadros de diálogo
   * @param overlay Capa para los componentes superpuestos
   */
  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private router: Router,
    public dialog: MatDialog,
    private overlay: Overlay,
  ) { }

  /**
   * Navega a la página de favoritos del usuario.
   * @param idUsuario ID del usuario cuyos favoritos se van a mostrar
   * @param userName Nombre de usuario para mostrar en la página de favoritos
   */
  verFavs(idUsuario: string | number, userName: string) {
    this.router.navigate(['/users/favs', idUsuario], { state: { userName: userName } });
    this.dialogRef.close();
  }

  /**
   * Abre el cuadro de diálogo para editar el perfil del usuario.
   * @param user Datos del usuario actual
   */
  async editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
  }

  goBack(): void {
    this.dialogRef.close();
  }
}
