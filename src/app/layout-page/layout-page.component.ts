import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { ProfilePageComponent } from '../users/profile-page/profile-page.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import { User } from '../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'moodshare-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})

export class LayoutPageComponent implements OnInit {
  footerInfo = "                     sebastián villegas - 2024"
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isAuthenticated: boolean = false;

  emailActual: string | null = ""
  // userActual: User | null = null;
  currentToken: string | null = null;

  displayedColumns!: string[];

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private overlay: Overlay,
    /* private usersService: UsersService, */
  ) { }

  ngOnInit(): void {
    // this.currentToken = this.tokenActual();
    // this.isAuthenticated = !!this.currentToken;
  }

  hayToken(): boolean {
    let hayToken: boolean = false;
    this.currentToken = localStorage.getItem('token');
    // this.nombre_publico = localStorage.getItem('nombre_publico');

    if (this.currentToken) {
      hayToken = true;
    } else {
      hayToken = false;
    }
    return hayToken;
  }

  // tokenActual(): string | null {
  //   return localStorage.getItem("token");
  // }

  // TODO: Método para obtener el PERFIL del usuario
  async getUser() {
    console.log("layout" + this.authService.userActual);
  }

  // Método para abrir el perfil de usuario desde la barra superior
  // async openProfile(user: User) {
  //   const dialogRef = this.dialog.open(ProfilePageComponent, { data: user, width: '45vw', height: '80vh', scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  // }

  logOut() {
    this.authService.logout();

    localStorage.removeItem('token');
    // localStorage.removeItem('nombre_publico');
    this.isAuthenticated = false;
    this.emailActual = '';
    // Reinicia el componente para refrescar las actualizaciones
    this.ngOnInit();
    this.router.navigate(['/login']);

  }

  // Metodo para mostrar el boton de panel de usuario dependiendo del rol
  // mostrarBotonGestion() {
  //   let id_rol_actual = localStorage.getItem('id_rol');
  //   let mostrar: boolean = false;
  //   if (id_rol_actual == '1') {
  //     mostrar = true;
  //   }
  //   return mostrar;
  // }
}
