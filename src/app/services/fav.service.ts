import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiscogsService } from './discogs.service';
import { URL_BASE_BACKEND } from 'src/environments/environment';
import { Favorite } from '../shared/interfaces/favorite.interface';


const ENDPOINT = 'favs';

@Injectable({
  providedIn: 'root'
})

export class FavService {
  // Array para almacenar los IDs de favoritos del usuario
  idsFavoritesDelUsuario: (string | number)[] = [];

  constructor(private httpClient: HttpClient,
              private usersService: UsersService,
              private discogsService: DiscogsService,
              private snackBar: MatSnackBar,
              ) { }

  getFavs(idUsuario: number | string) {
    return this.httpClient.get<Favorite[]>(`${URL_BASE_BACKEND}/${ENDPOINT}/${idUsuario}`);
  }

  addFav(favorite: { idUsuario: number | string, idElemento: number | string, tipoElemento: string }) {
    return this.httpClient.post<Favorite>(`${URL_BASE_BACKEND}/${ENDPOINT}`, favorite);
  }

  deleteFav(idFav: number | string) {
    return this.httpClient.delete<any>(`${URL_BASE_BACKEND}/delete/${idFav}`);
  }

  async getUserFavoriteIds(idUsuario: number | string) {
    try {
      const RESPONSE = await this.getFavs(idUsuario).toPromise();
      if (RESPONSE) {
        // Reiniciar el array para evitar duplicados
        this.idsFavoritesDelUsuario = [];
        for (const favorite of RESPONSE) {
          this.idsFavoritesDelUsuario.push(favorite.idElemento);
        }
      }
    } catch (error) {
      console.error('Error al obtener los favoritos del usuario: ', error);
    }
  }
}
