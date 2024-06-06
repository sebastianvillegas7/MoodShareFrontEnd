import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_BASE_BACKEND } from 'src/environments/environment';
import { Router } from '@angular/router';

/**
 * Servicio para manejar la autenticación de usuarios.
 * Proporciona métodos para registrar, iniciar y cerrar sesión,
 * y verificar el estado de autenticación del usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  /**
   * Método para registrar un nuevo usuario.
   * @param userData Datos del usuario a registrar.
   * @returns Observable con la respuesta del servidor.
   */
  register(userData: { name: string, apellido: string, email: string, password?: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/registro`, userData);
  }

  /**
   * Método para iniciar sesión.
   * @param credentials Credenciales del usuario (email y contraseña).
   * @returns Observable con la respuesta del servidor.
   */
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            // Guardar token y ID de usuario en el almacenamiento local
            this.guardarToken(response.token);
            this.guardarIDUsuario(response.userId);
          }
        })
      );
  }

  /**
   * Método para guardar el token en el almacenamiento local.
   * @param token Token de autenticación.
   */
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Método para guardar el ID de usuario en el almacenamiento local.
   * @param id_usuario ID de usuario.
   */
  guardarIDUsuario(id_usuario: number): void {
    localStorage.setItem('id_usuario', id_usuario.toString());
  }

  /**
   * Método para cerrar sesión, limpia el almacenamiento local
   * y redirige al usuario a la página de inicio de sesión.
   */
  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  /**
   * Método para limpiar el almacenamiento local.
   * Se utiliza al cerrar sesión.
   */
  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('currentUser');
  }

  /**
   * Método para obtener el token de autenticación del almacenamiento local.
   * @returns Token de autenticación.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Método para verificar si el usuario está autenticado.
   * @returns True si el token existe en el almacenamiento local, de lo contrario false.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Método para verificar si el usuario tiene el rol de administrador.
   * @returns True si el rol almacenado es 'ADMIN', de lo contrario false.
   */
  isAdmin(): boolean {
    let currentRol = localStorage.getItem('rol');
    return currentRol == 'ADMIN';
  }
}
