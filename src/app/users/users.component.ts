import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../shared/interfaces/user.interface';
import { UsersService } from '../services/users.service';
// import { Permises } from '../shared/interfaces/api-response.interface';

import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';


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


  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
    private overlay: Overlay,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const RESPONSE = await this.usersService.getUsers().toPromise();
    this.usersService.listadoUsers = RESPONSE as User[];
  }

  async addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
        this.usersService.listadoUsers.push(RESULT.data);
        this.dataSource.data = this.usersService.listadoUsers;
        this.getUsers();
    }
  }

  async editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      this.dataSource.data = this.usersService.listadoUsers;
      this.getUsers();
    }
  }

  async deleteUser(id_usuario: number | string | undefined) {
    const dialogRef = this.dialog.open(DeleteUserComponent, { data: id_usuario, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      this.getUsers();
    }
  }
}
