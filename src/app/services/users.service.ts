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

  // Método para obtener todos los usuarios
  getUsers() {
    return this.httpClient.get<User[]>(`${URL_API_BACKEND}`);
  }

  addUser(userData: { name: string, apellido: string, email: string, password: string }) {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/registro`, userData);
  }

  editUser(id_usuario: number | string, userData: { name: string, apellido: string, email: string, password: string }) {
    // const body = JSON.stringify(user);
    return this.httpClient.put<any>(`${URL_API_BACKEND}/${id_usuario}`, userData);
  }

  deleteUser(id_usuario: number | string) {
    return this.httpClient.delete<any>(`${URL_API_BACKEND}/${id_usuario}`);
  }

  getRolUsuario(): string | null {
    return localStorage.getItem('rol');
  }
}
