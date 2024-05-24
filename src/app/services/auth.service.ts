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
  userActual: string = "";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
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
            this.userActual = credentials.email;
            this.guardarToken(response.token);
            console.log("user actual" + this.userActual);

          }
        })
      );
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
