import { URL_API_BACKEND, URL_BASE_BACKEND } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  listadoUsers: User[] = [];
  currentUser: User | undefined;

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  getUserById(id_usuario: number | string) {
    return this.httpClient.get<any>(`${URL_API_BACKEND}/${id_usuario}`);
  }

  async setUserById() {
    let id_usuario = localStorage.getItem('id_usuario');
    try {
      if (id_usuario) {
        const RESPONSE = await this.getUserById(id_usuario).toPromise();

        if (RESPONSE) {
          this.currentUser = RESPONSE as User;
          localStorage.setItem('rol', this.currentUser.roles[0].name);
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
  getUsers() {
    return this.httpClient.get<User[]>(`${URL_API_BACKEND}`);
  }

  addUser(userData: { name: string, apellido: string, email: string, password: string }) {
    // const body = JSON.stringify(user); // TODO: SEGUIR ACA
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/api/registro`, userData);
  }

  editUser(id_usuario: number | string, user: User) {
    const body = JSON.stringify(user);
    return this.httpClient.put<User>(`${URL_API_BACKEND}/${id_usuario}`, body);
  }

  deleteUser(id_usuario: number | string) {
    return this.httpClient.delete<any>(`${URL_API_BACKEND}/${id_usuario}`);
  }
}
