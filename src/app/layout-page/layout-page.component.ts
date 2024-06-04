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

export class LayoutPageComponent implements OnInit {
  footerInfo = "Sebastián Villegas ® 2024"
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isAuthenticated: boolean = false;
  userActual: User | null = null;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private overlay: Overlay,
    public usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.hayToken();
    if (this.isAuthenticated) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.usersService.currentUser = JSON.parse(storedUser);
      }
    }
  }

  hayToken(): boolean {
    return !!localStorage.getItem("token");
  }

  // Método para abrir el perfil de usuario desde la barra superior
  async openProfile() {
    const dialogRef = this.dialog.open(ProfilePageComponent, { data: this.usersService.currentUser!, width: '45vw', height: '80vh', scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
  }

  logOut() {
    this.authService.logout();
    this.isAuthenticated = false;
    // Reinicia el componente para refrescar las actualizaciones
    this.ngOnInit();
  }
}
