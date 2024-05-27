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

  // public lista_fav: Movie[] = [];
  // idMovieToFavMap: { [key: string]: string } = {};
  // arrayIdsMovies: string[] | number[] = [];
  // arrayIdsFavs: string[] = [];

  // permises!: Permises | null;

  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  constructor(
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    // private movieService: MovieService,
    private router: Router,
    private snackBar: MatSnackBar,
    // private favService: FavService,
    private usersService: UsersService,
    public dialog: MatDialog,
    private overlay: Overlay,
  ) {

  }

  ngOnInit(): void {
    // console.log("user en profile inject: " + this.user[0].id_usuario);

    // this.getIdsFavoritas();
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

  // async getIdsFavoritas() {
  //   const RESPONSE = await this.favService.getFavs(this.loca[0].id_usuario).toPromise();
  //   if (RESPONSE !== undefined && RESPONSE.permises !== undefined && RESPONSE.ok) {
  //     this.arrayIdsMovies = RESPONSE.data.map((item: { id_movie: any }) => item.id_movie);
  //     for (const item of RESPONSE.data) {
  //       this.idMovieToFavMap[item.id_movie] = item.id_fav;
  //     }
  //   }

  //   this.obtenerPeliculas();
  // }

  // async obtenerPeliculas() {
  //   const observables: Observable<Movie>[] = [];

  //   for (const id of this.arrayIdsMovies) {
  //     const observable = this.movieService.getMovieByID(id);
  //     observables.push(observable);
  //   }

  //   forkJoin(observables).subscribe({
  //     next: (movies: Movie[]) => {
  //       this.lista_fav = movies;
  //     },
  //     error: (error: any) => {
  //       console.error('Error obteniendo películas favoritas:', error);
  //     },
  //   });
  // }

  // redirectToMovie(id_movie: number) {
  //   // Combinamos la ruta base con la ruta a la película
  //   const newUrl = `/movies/${id_movie}`;

  //   // Navegamos a la nueva URL
  //   this.router.navigateByUrl(newUrl);
  //   this.goBack();
  // }

  // async quitarFavorita(id_fav: number | string) {
  //   const response = await this.favService.deleteFav(id_fav).toPromise();
  //   if (response && response.ok && response?.message) {
  //     this.snackBar.open("Pelicula quitada de favoritas", 'Cerrar', { duration: 5000 });
  //   } else {
  //     this.snackBar.open('Error al quitar de favoritas', 'Cerrar', { duration: 5000 });
  //   }
  //   this.getIdsFavoritas();
  // }

  // quitarFavoritaPorId(id_movie: number | string) {
  //   const id_fav = this.idMovieToFavMap[id_movie];
  //   if (id_fav) {
  //     this.quitarFavorita(id_fav);
  //   }
  // }

  goBack(): void {
    this.dialogRef.close();
  }
}


