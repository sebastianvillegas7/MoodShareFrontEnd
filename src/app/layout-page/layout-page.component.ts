import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilePageComponent } from '../users/profile-page/profile-page.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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

export class LayoutPageComponent implements OnInit {
  footerInfo = "                     sebastián villegas - 2024"
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isAuthenticated: boolean = false;

  emailActual: string | null = ""
  userActual: User | null = null;
  currentToken: string | null = null;

  displayedColumns!: string[];

  constructor(
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private overlay: Overlay,
    public usersService: UsersService,
  ) { }

  ngOnInit(): void {
    // this.currentToken = this.tokenActual();
    // this.isAuthenticated = !!this.currentToken;
  }

  hayToken(): boolean {
    let hayToken: boolean = false;

    if (localStorage.getItem("token")) {
      hayToken = true;
    } else {
      hayToken = false;
    }
    return hayToken;
  }


  // TODO: Método para obtener el PERFIL del usuario
  // async getUser() {
  //   console.log("user service: " + this.usersService.currentUser!.email);

  //   this.openProfile(this.usersService.currentUser!);
  //   // console.log("layout" + this.authService.userActual);
  // }

  // Método para abrir el perfil de usuario desde la barra superior
  async openProfile() {
    this.usersService.setUserById();
    const USER: User = this.usersService.currentUser!
    const dialogRef = this.dialog.open(ProfilePageComponent, { data: USER, width: '45vw', height: '80vh', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
  }

  logOut() {
    this.authService.logout();
    this.isAuthenticated = false;
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
