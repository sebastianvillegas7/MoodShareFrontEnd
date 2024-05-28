import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
// import { MovieService } from 'src/app/services/movies.service';
// import { Movie } from 'src/app/shared/interfaces/movie.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
// import { FavService } from '../../services/fav.service';
// import { Permises } from 'src/app/shared/interfaces/api-response.interface';
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

export class ProfilePageComponent implements OnInit {
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

  ngOnInit(): void {
    // console.log("user en profile inject: " + this.user[0].id_usuario);

  }

  // async editUser(user: User) {
  //   const dialogRef = this.dialog.open(EditUserComponent, { data: user, scrollStrategy: this.overlay.scrollStrategies.noop() });
  //   const RESULT = await dialogRef.afterClosed().toPromise();
  //   if (RESULT) {
  //     if (RESULT.ok) {
  //       this.dataSource.data = this.usersService.users;
  //     }
  //   }
  // }



  goBack(): void {
    this.dialogRef.close();
  }
}


