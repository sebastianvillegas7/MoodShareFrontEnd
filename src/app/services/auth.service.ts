import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_BASE_BACKEND } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    // this.clearLocalStorage();
  }

  register(userData: { name: string, apellido: string, email: string, password?: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/registro`, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.guardarToken(response.token);
            this.guardarIDUsuario(response.userId);
          }
        })
      );
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  guardarIDUsuario(id_usuario: number): void {
    localStorage.setItem('id_usuario', id_usuario.toString());
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
  }

  clearLocalStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('currentUser');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    let currentRol = localStorage.getItem('rol');
    return currentRol == 'ADMIN';
  }
}
