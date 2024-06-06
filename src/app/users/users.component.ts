import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../shared/interfaces/user.interface';
import { UsersService } from '../services/users.service';

import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


/**
 * Componente que gestiona el CRUD de usuarios.
 */
@Component({
  selector: 'users-users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  selection!: SelectionModel<User>;
  user!: User;

  /**
   * Constructor del componente.
   * @param dialog Servicio para abrir cuadros de diálogo
   * @param usersService Servicio para gestionar usuarios
   * @param overlay Servicio para superposiciones de Angular CDK
   * @param router Servicio para la gestión de rutas de Angular
   */
  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
    private overlay: Overlay,
    private router: Router,
  ) { }

  /**
   * Al inicializar el componente se obtiene la lista de usuarios.
   */
  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Navega a la página de favoritos de un usuario.
   * @param idUsuario ID del usuario
   * @param userName Nombre de usuario
   */
  verFavs(idUsuario: string | number, userName: string) {
    this.router.navigate(['/users/favs', idUsuario], { state: { userName: userName } });
  }

  /**
   * Obtiene la lista de usuarios de la BBDD.
   */
  async getUsers() {
    const RESPONSE = await this.usersService.getUsers().toPromise();
    this.usersService.listadoUsers = RESPONSE as User[];
  }

  /**
   * Método para agregar un nuevo usuario.
   */
  async addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      this.usersService.listadoUsers.push(RESULT.data);
      this.dataSource.data = this.usersService.listadoUsers;
      this.getUsers();
    }
  }

  /**
   * Método para editar un usuario existente.
   * @param user Objeto User a editar
   */
  async editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      this.dataSource.data = this.usersService.listadoUsers;
      this.getUsers();
    }
  }

  /**
   * Método para eliminar un usuario.
   * @param id_usuario ID del usuario a eliminar
   */
  async deleteUser(id_usuario: number | string | undefined) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: id_usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      this.getUsers();
    }
  }
}
