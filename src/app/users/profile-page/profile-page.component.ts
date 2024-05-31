import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Overlay } from '@angular/cdk/overlay';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'users-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private router: Router,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    public dialog: MatDialog,
    private overlay: Overlay,
  ) {

  }

  verFavs() {
    this.router.navigate([`/users/favs`]);
    this.dialogRef.close();
  }

  async editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
  }

  goBack(): void {
    this.dialogRef.close();
  }
}
