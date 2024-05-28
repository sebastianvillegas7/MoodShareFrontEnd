import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/interfaces/user.interface';
import { Observable, forkJoin } from 'rxjs';
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

  constructor(private httpClient: HttpClient,
              private usersService: UsersService,
              private discogsService: DiscogsService,
              private snackBar: MatSnackBar,
              ) { }

  getFavs(id_usuario: number | string) {
    return this.httpClient.get<Favorite[]>(`${URL_BASE_BACKEND}/${ENDPOINT}/${id_usuario}`);
  }

  // insertarFav(id_usuario: number | string, id_movie: number | string) {
  //   const body = JSON.stringify({ id_usuario: id_usuario, id_movie: id_movie });
  //   return this.httpClient.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  // }

  // deleteFav(id_fav: number | string) {
  //   return this.httpClient.delete<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_fav=${id_fav}`, { headers: this.commonService.headers });
  // }
}
