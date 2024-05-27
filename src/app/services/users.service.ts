import { URL_API_BACKEND, URL_BASE_BACKEND } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  // userActual!: User;
  users: User[] = [];
  currentUser: User | undefined;
  // arrayIdsMovies: string[] | number[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  async setUserById() {
    let id_usuario = localStorage.getItem('id_usuario');
    try {
      if (id_usuario) {
        const RESPONSE = await this.getUserById(id_usuario).toPromise();
        if (RESPONSE) {
          this.currentUser = RESPONSE as User;
        } else {
          console.error('No se pudo obtener el usuario por el id.');
        }
      } else {
        console.error('El id_usuario es nulo.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario por el id:', error);
    }
  }

  // Método para obtener todos los usuarios
  // getUsers() {
  //   return this.http.get<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  // }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/registro`, body);
  }

  // editUser(user: User, route?: string) {
  //   const body = JSON.stringify(user);

  //   if (route) {
  //     route = `?route=${route}`;
  //   } else {
  //     route = '';
  //   }

  //   return this.http.put<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  // }

  // deleteUser(id_usuario: number) {
  //   return this.http.delete<ApiResponse>(`${URL_API_SGE}/${ENDPOINT}.php?id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  // }

  getUserById(id_usuario: number | string) {
    return this.httpClient.get<User>(`${URL_API_BACKEND}/${id_usuario}`);
  }
}
