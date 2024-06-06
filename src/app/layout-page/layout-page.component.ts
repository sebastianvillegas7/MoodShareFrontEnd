import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProfilePageComponent } from '../users/profile-page/profile-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import { User } from '../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'moodshare-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})

/**
 * Componente base donde se insertan y muestran
 * todas las plantillas HTML de la aplicación.
 */
export class LayoutPageComponent implements OnInit {
  footerInfo = "Sebastián Villegas ® 2024";
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isAuthenticated: boolean = false;
  userActual: User | null = null;

  /**
   * Constructor del componente LayoutPageComponent.
   *
   * @param authService El servicio de autenticación.
   * @param dialog El servicio de diálogo de Angular Material.
   * @param overlay El servicio de overlay para la gestión de scroll.
   * @param usersService El servicio de usuarios.
   */
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private overlay: Overlay,
    public usersService: UsersService,
  ) { }

  /**
   * Verificar la autenticación y cargar el usuario almacenado.
   */
  ngOnInit(): void {
    this.isAuthenticated = this.hayToken();
    if (this.isAuthenticated) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.usersService.currentUser = JSON.parse(storedUser);
      }
    }
  }

  /**
   * Verificar si hay un token de autenticación almacenado.
   *
   * @returns True si hay un token, false en caso contrario.
   */
  hayToken(): boolean {
    return !!localStorage.getItem("token");
  }

  /**
   * Abrir el perfil de usuario en un diálogo.
   */
  async openProfile() {
    const dialogRef = this.dialog.open(ProfilePageComponent, {
      data: this.usersService.currentUser!,
      width: '45vw',
      height: '80vh',
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    const RESULT = await dialogRef.afterClosed().toPromise();
  }

  /**
   * Cierra la sesión del usuario.
   * Actualiza el estado de autenticación y reinicia el componente.
   */
  logOut() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.ngOnInit();
  }
}
