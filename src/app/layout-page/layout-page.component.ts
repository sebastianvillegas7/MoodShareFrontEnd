import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfilePageComponent } from '../users/profile-page/profile-page.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { UsersService } from '../services/users.service';
import { Permises } from '../shared/interfaces/api-response.interface';
import { User } from '../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'movies-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: [ './layout-page.component.css' ]
})

export class LayoutPageComponent  implements OnInit {
  footerInfo = "                     sebastián villegas - 2024"
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isAuthenticated: boolean = false;

  nombre_publico: string | null = ""
  userActual: User | null = null;
  currentToken: string | null = "";

  permises!: Permises | null;
  displayedColumns!: string[];

  constructor ( private authService: AuthService,
                private router: Router,
                public dialog: MatDialog,
                private overlay: Overlay,
                private usersService: UsersService,
                ) { }

  ngOnInit(): void {
    this.currentToken = this.tokenActual();
    this.isAuthenticated = !!this.currentToken;
    this.nombre_publico = localStorage.getItem('nombre_publico');
  }

  hayToken(): boolean {
    let hayToken: boolean = false;
    this.currentToken = localStorage.getItem('token');
    this.nombre_publico = localStorage.getItem('nombre_publico');

    if (this.currentToken) {
      hayToken = true;
    } else {
      hayToken = false;
    }
    return hayToken;
  }

  tokenActual(): string | null {
    return localStorage.getItem("token");
  }

  // Método para obtener el usuario a partir del token
  async getUserPorToken() {
      if (this.currentToken) {
        const RESPONSE = await this.usersService.getUserByToken(localStorage.getItem("token")).toPromise();
      if (RESPONSE !== undefined) {
        if (RESPONSE.permises !== undefined) {
          this.permises = RESPONSE.permises;

          if (RESPONSE.ok) {
            // Se almacena en la propiedad 'userActual' la respuesta de la solicitud
            this.userActual = RESPONSE.data as User;

            // Se asigna a la propiedad 'currentUser' del servicio los valores del usuario
            // obtenidos a partir del token
            this.usersService.currentUser = this.userActual

            // Se hace la llamada al componente Perfil con el usuario obtenido del token
            this.openProfile(this.userActual)
          }
        }
      }
    }
  }

  // Método para abrir el perfil de usuario desde la barra superior
  async openProfile(user: User) {
    const dialogRef = this.dialog.open(ProfilePageComponent, { data: user, width: '45vw', height: '80vh', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();    
  }

  logOut() {
    const logoutObservable: Observable<any> | undefined = this.authService?.doLogout?.();
    if (logoutObservable) {
      logoutObservable.subscribe(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('nombre_publico');
        this.isAuthenticated = false;
        this.nombre_publico = '';
        // Reinicia el componente para refrescar las actualizaciones
        this.ngOnInit();
        this.router.navigate(['/auth']);
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  // Metodo para mostrar el boton de panel de usuario dependiendo del rol
  mostrarBotonGestion() {
    let id_rol_actual = localStorage.getItem('id_rol');
    let mostrar: boolean = false;
    if (id_rol_actual == '1') {
      mostrar = true;
    }
    return mostrar;
  }
}
