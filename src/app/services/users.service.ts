import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API_BACKEND, URL_BASE_BACKEND } from 'src/environments/environment';
import { User } from '../shared/interfaces/user.interface';

/**
 * Servicio para interactuar con la API de SpringBoot y gestionar usuarios.
 * Permite obtener, agregar, editar y eliminar usuarios, así como obtener el rol de usuario actual.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  listadoUsers: User[] = [];
  currentUser: User | undefined; // Usuario actualmente logeado

  /**
   * Constructor del servicio.
   * @param httpClient Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(
    private httpClient: HttpClient,
  ) {}

  /**
   * Método para obtener un usuario por su ID.
   * @param id_usuario El ID del usuario que se desea obtener.
   * @returns Un Observable que emite el usuario obtenido.
   */
  getUserById(id_usuario: number | string) {
    return this.httpClient.get<any>(`${URL_API_BACKEND}/${id_usuario}`);
  }

  /**
   * Método para obtener todos los usuarios.
   * @returns Un Observable que emite un array de usuarios.
   */
  getUsers() {
    return this.httpClient.get<User[]>(`${URL_API_BACKEND}`);
  }

  /**
   * Método para agregar un nuevo usuario.
   * @param userData Objeto que contiene la información del usuario a agregar.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  addUser(userData: { name: string, apellido: string, email: string, password?: string }) {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/registro`, userData);
  }

  /**
   * Método para editar un usuario existente.
   * @param id_usuario El ID del usuario que se desea editar.
   * @param userData Objeto que contiene la información actualizada del usuario.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  editUser(id_usuario: number | string, userData: { name: string, apellido: string, email: string, password?: string }) {
    return this.httpClient.put<any>(`${URL_API_BACKEND}/${id_usuario}`, userData);
  }

  /**
   * Método para eliminar un usuario.
   * @param id_usuario El ID del usuario que se desea eliminar.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  deleteUser(id_usuario: number | string) {
    return this.httpClient.delete<any>(`${URL_API_BACKEND}/${id_usuario}`);
  }

  /**
   * Método para obtener el rol del usuario actualmente autenticado.
   * @returns El rol del usuario actual o null si no hay un usuario autenticado.
   */
  getRolUsuario(): string | null {
    return localStorage.getItem('rol');
  }
}
