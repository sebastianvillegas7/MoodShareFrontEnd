import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API_SGE } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';
import { Movie } from '../shared/interfaces/movie.interface';
import { Observable, forkJoin } from 'rxjs';
import { UsersService } from './users.service';
import { MovieService } from './movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';


const ENDPOINT = 'movies_fav';

@Injectable({
  providedIn: 'root'
})

export class FavService {

  user!: User;
  users: User[] = [];
  currentUser!: User;

  arrayIdsMovies: string[] | number[] = [];
  lista_fav_service: Movie[] = [];

  constructor(private http: HttpClient,
              private commonService: CommonService,
              private usersService: UsersService,
              private movieService: MovieService,
              private snackBar: MatSnackBar,
              ) { }

  setUser(user: User) {
    this.user = user;
  }

  
  getFavs(id_usuario: number) {
    return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_usuario=${id_usuario}` , { headers: this.commonService.headers });
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUser(user: User,  route?: string) {
    const body = JSON.stringify(user);
    return this.http.put<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteFav(id_fav: number | string) {
    return this.http.delete<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_fav=${id_fav}`, { headers: this.commonService.headers });
  }

  insertarFav(id_usuario: number | string, id_movie: number | string) {
    const body = JSON.stringify({ id_usuario: id_usuario, id_movie: id_movie });
    return this.http.post<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }
  
  async getIdsFavoritas(id_usuario: number) {
    const RESPONSE = await this.getFavs(id_usuario).toPromise();
    if (RESPONSE !== undefined && RESPONSE.permises !== undefined && RESPONSE.ok) {
      this.arrayIdsMovies = RESPONSE.data.map((item: { id_movie: any }) => item.id_movie);
    }
  }
}
