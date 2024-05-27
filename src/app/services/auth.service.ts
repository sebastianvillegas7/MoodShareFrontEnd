import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_BASE_BACKEND } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userActual: string = "";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private usersService: UsersService,
  ) { }

  // Método para registrar un nuevo usuario
  register(userData: { name: string, apellido: string, email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/api/registro`, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/api/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.guardarToken(response.token);
            this.guardarIDUser(response.userId);
          }
        })
      );
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  guardarIDUser(id_usuario: number): void {
    localStorage.setItem('id_usuario', id_usuario.toString());
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
