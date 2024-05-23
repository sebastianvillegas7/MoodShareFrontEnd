import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_BASE_BACKEND } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(userData: { name: string, apellido: string, email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/register`, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${URL_BASE_BACKEND}/login`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.saveToken(response.token); // Guarda el token cuando se recibe la respuesta
          }
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('accessToken', token); // Método para guardar el token en el almacenamiento local
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
