import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscogsService } from 'src/app/services/discogs.service';
// import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'moodshare-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  esFavorita: boolean = false;

  resourceUrl: string = "";
  type: string = "";
  resourceData: any;

  constructor(private router: Router,
    public discogsService: DiscogsService,
  ) { }

  ngOnInit(): void {
    this.resourceUrl = history.state.resourceUrl;
    this.type = history.state.type;

    this.discogsService.getResourceDataByUrl(this.resourceUrl).subscribe(
      (respuesta) => {
        if (!respuesta) return this.router.navigate(['/home']);

        this.resourceData = respuesta;
        if (this.type == 'artist') {
          this.getReleases(respuesta.id);
        }
        return;
      });
  }

  getReleases(artistId: number): void {
    this.discogsService.getArtistReleases(artistId).subscribe(
      (data) => {
        this.discogsService.listadoReleases = data.releases;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  async comprobarSiEsFavorita(id_movie: string | number | null) {
    // console.log(localStorage.getItem('id_usuario'));
    // this.id_user_Actual = localStorage.getItem('id_usuario');
    // console.log(this.id_user_Actual);

    // const RESPONSE = await this.favService.getFavs(this.id_user_Actual).toPromise();
    // if (RESPONSE !== undefined && RESPONSE.ok) {

    //   this.arrayIdsMovies = RESPONSE.data.map(
    //     (item: { id_movie: any, id_fav: any }) => {
    //       this.idMovieToFavMap[item.id_movie] = item.id_fav; // Asociar id_movie con id_fav
    //       return item.id_movie;
    //   });

    //   // Verificar si el id_movie está presente en el mapa y obtener su id_fav asociado
    //   if (id_movie && this.idMovieToFavMap.hasOwnProperty(id_movie)) {
    //     this.esFavorita = true; // Si encuentra la película en favoritas, establece a true
    //     const id_fav = this.idMovieToFavMap[id_movie]; // Obtener id_fav asociado
    //     console.log(`La película con id_movie ${id_movie} tiene id_fav ${id_fav}`);
    //   }
    // }
  }


  buttonClick(): void {
    // // Lógica para agregar o quitar la película de la lista de favoritos según su estado
    // if (this.esFavorita) {
    //   // Si la película es favorita, llamar al método para quitarla de favoritos
    //   this.quitarFavoritaPorIdMovie(this.id_movie_actual);
    //   this.esFavorita = false; // Cambiar el estado después de quitar la película de favoritos
    // } else {
    //   // Si la película no es favorita, llamar al método para agregarla a favoritos
    //   this.agregarFavorita(this.id_movie_actual!);
    //   this.esFavorita = true; // Cambiar el estado después de agregar la película a favoritos
    // }
  }

  async agregarFavorita(id_movie: string | number) {
    // if (this.userActual) {
    //   let idprueba = this.userActual.id_usuario
    //   // console.log(idprueba);

    //   const response = await this.favService.insertarFav(idprueba, id_movie).toPromise();
    //   if (response && response.ok && response?.message) {
    //     this.snackBar.open("Agregada a favoritas", 'Cerrar', { duration: 5000 });
    //   } else {
    //     this.snackBar.open('Error al agregar a favoritas', 'Cerrar', { duration: 5000 });
    //   }
    // }
  }

  async quitarFavorita(id_fav: string | number) {
    // if (this.userActual) {
    //   let idprueba = this.userActual.id_usuario
    //   console.log(idprueba);

    //   const response = await this.favService.deleteFav(id_fav).toPromise();
    //   if (response && response.ok && response?.message) {
    //     this.snackBar.open("Pelicula quitada de favoritas", 'Cerrar', { duration: 5000 });
    //   } else {
    //     this.snackBar.open('Error al quitar la pelicula de favoritas', 'Cerrar', { duration: 5000 });
    //   }
    // }
  }

  quitarFavoritaPorIdMovie(id_movie: number | string) {
    //   const id_fav = this.idMovieToFavMap[id_movie];
    //   if (id_fav) {
    //     this.quitarFavorita(id_fav);
    //   }
  }

  goBack(): void {
    this.router.navigate(['/moodshare/home'])
  }
}
