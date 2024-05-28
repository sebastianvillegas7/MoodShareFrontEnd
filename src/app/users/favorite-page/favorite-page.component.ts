import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavService } from 'src/app/services/fav.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable, forkJoin, map } from 'rxjs';
import { DiscogsService } from '../../services/discogs.service';
import { Favorite, TipoElemento } from 'src/app/shared/interfaces/favorite.interface';
import { SearchResponse } from 'src/app/shared/interfaces/search-response.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Track } from 'src/app/shared/interfaces/track.interface';

@Component({
  selector: 'users-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
})
export class FavoritePageComponent implements OnInit {
  public listadoArtists: any[] = [];
  public listadoReleases: any[] = [];
  public listadoMasters: any[] = [];


  idFavAndIdElemMap: { [key: string | number]: string | number } = {};
  arrayIdsArtist: (string | number)[] = [];
  arrayIdsReleases: (string | number)[] = [];
  arrayIdsMasters: (string | number)[] = [];

  constructor(
    private favService: FavService,
    private usersService: UsersService,
    private discogsService: DiscogsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getIdsFavorites();
  }

  async getIdsFavorites() {
    const idUsuario = localStorage.getItem('id_usuario')!;
    if (!idUsuario) {
      this.snackBar.open('No se encontró el ID de usuario.', 'Cerrar', { duration: 5000 });
      return;
    }

    try {
      const RESPONSE = await this.favService.getFavs(idUsuario).toPromise();

      if (RESPONSE && RESPONSE.length > 0) {
        for (const favorite of RESPONSE) {
          this.idFavAndIdElemMap[favorite.idFav] = favorite.idElemento;

          switch (favorite.tipoElemento) {
            case TipoElemento.Artist:
              this.arrayIdsArtist.push(favorite.idElemento);
              break;
            case TipoElemento.Release:
              this.arrayIdsReleases.push(favorite.idElemento);
              break;
            case TipoElemento.Master:
              this.arrayIdsMasters.push(favorite.idElemento);
              break;
          }
        }
        this.obtenerFavorites();
      } else {
        this.snackBar.open('No hay favoritos para mostrar.', 'Cerrar', { duration: 5000 });
      }
    } catch (error) {
      console.error('Error al obtener los favoritos: ', error);
      this.snackBar.open('Error al obtener los favoritos.', 'Cerrar', { duration: 5000 });
    }
  }

  async obtenerFavorites() {
    const OBSERVABLES_ARTISTS: Observable<any>[] = this.arrayIdsArtist.map(id =>
      this.discogsService.getInfoArtistById(id).pipe(map(data => ({ ...data, tipoElemento: TipoElemento.Artist })))
    );
    const OBSERVABLES_RELEASES: Observable<any>[] = this.arrayIdsReleases.map(id =>
      this.discogsService.getReleaseById(id).pipe(map(data => ({ ...data, tipoElemento: TipoElemento.Release })))
    );
    const OBSERVABLES_MASTERS: Observable<any>[] = this.arrayIdsMasters.map(id =>
      this.discogsService.getMasterById(id).pipe(map(data => ({ ...data, tipoElemento: TipoElemento.Master })))
    );

    forkJoin([...OBSERVABLES_ARTISTS, ...OBSERVABLES_RELEASES, ...OBSERVABLES_MASTERS]).subscribe({
      next: (favorites: any[]) => {
        this.listadoArtists = favorites.filter(item => item.tipoElemento === TipoElemento.Artist);
        this.listadoReleases = favorites.filter(item => item.tipoElemento === TipoElemento.Release);
        this.listadoMasters = favorites.filter(item => item.tipoElemento === TipoElemento.Master);
      },
      error: (error: any) => {
        console.error('Error obteniendo favoritos: ', error);
      },
    });
  }

  verDetalle(resourceUrl: string, type: string) {
    this.router.navigate(['/moodshare/detail'], { state: { resourceUrl, type } });
  }
}

// async getIdsFavorites() {
//   const idUsuario = localStorage.getItem('id_usuario')!;
//   if (!idUsuario) {
//     this.snackBar.open('No se encontró el ID de usuario.', 'Cerrar', { duration: 5000 });
//     return;
//   }

//   try {
//     const RESPONSE = await this.favService.getFavs(idUsuario).toPromise();

//     if (RESPONSE && RESPONSE.length > 0) {
//       // Mapea la respuesta [key: idFav, value: idElemento]
//       for (const favorite of RESPONSE) {
//         this.idFavAndIdElemMap[favorite.idFav] = favorite.idElemento;

//         // Clasifica el idElemento según el tipoElemento
//         switch (favorite.tipoElemento) {
//           case TipoElemento.Artist:
//             this.arrayIdsArtist.push(favorite.idElemento);
//             break;
//           case TipoElemento.Release:
//             this.arrayIdsReleases.push(favorite.idElemento);
//             break;
//           case TipoElemento.Master:
//             this.arrayIdsMasters.push(favorite.idElemento);
//             break;
//         }
//       }
//       this.obtenerFavorites();
//     } else {
//       this.snackBar.open('No hay favoritos para mostrar.', 'Cerrar', { duration: 5000 });
//     }
//   } catch (error) {
//     console.error('Error al obtener los favoritos: ', error);
//     this.snackBar.open('Error al obtener los favoritos.', 'Cerrar', { duration: 5000 });
//   }
// }

// async obtenerFavorites() {
//   const OBSERVABLES: Observable<any>[] = [];

//   const OBSERVABLES_ARTISTS: Observable<SearchResponse<Artist>>[] = this.arrayIdsArtist.map(id => this.discogsService.getInfoArtistById(id));
//   const OBSERVABLES_RELEASES: Observable<SearchResponse<Album | Track>>[] = this.arrayIdsReleases.map(id => this.discogsService.getReleaseById(id));
//   const OBSERVABLES_MASTERS: Observable<SearchResponse<Album | Track>>[] = this.arrayIdsMasters.map(id => this.discogsService.getMasterById(id));

//   forkJoin(OBSERVABLES_ARTISTS).subscribe({
//     next: (favorites: any[]) => {
//       this.artists = favorites;
//     },
//     error: (error: any) => {
//       console.error('Error obteniendo películas favoritas:', error);
//     },
//   });

//   forkJoin(OBSERVABLES_RELEASES).subscribe({
//     next: (favorites: any[]) => {
//       this.releases = favorites;
//     },
//     error: (error: any) => {
//       console.error('Error obteniendo películas favoritas:', error);
//     },
//   });

//   forkJoin(OBSERVABLES_MASTERS).subscribe({
//     next: (favorites: any[]) => {
//       this.masters = favorites;
//     },
//     error: (error: any) => {
//       console.error('Error obteniendo películas favoritas:', error);
//     },
//   });
// }

















// async quitarFavorita(id_fav: number | string) {
//   try {
//     const response = await this.favService.deleteFav(id_fav).toPromise();
//     if (response && response.ok && response.message) {
//       this.snackBar.open('Elemento quitado de favoritos', 'Cerrar', { duration: 5000 });
//       this.getIdsFavorites();  // Actualiza la lista de favoritos después de eliminar
//     } else {
//       this.snackBar.open('Error al quitar de favoritos', 'Cerrar', { duration: 5000 });
//     }
//   } catch (error) {
//     console.error('Error al quitar de favoritos:', error);
//     this.snackBar.open('Error al quitar de favoritos', 'Cerrar', { duration: 5000 });
//   }
// }


// quitarFavoritaPorId(idElemento: number | string) {
//   const id_fav = this.idFavAndIdElemMap[idElemento];
//   if (id_fav) {
//     this.quitarFavorita(id_fav);
//   }
// }
