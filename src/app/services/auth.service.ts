import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { URL_API_SGE, URL_BASE_SGE } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { ApiResponse } from '../shared/interfaces/api-response.interface';
import { UsersService } from './users.service';
import { User } from '../shared/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user?: User;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private commonService: CommonService,
    private usersService: UsersService,
    private httpClient: HttpClient
  ) {
    this.user = usersService.currentUser
    this.getCurrentUser();
  }

  
  getCurrentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    return structuredClone(this.user)
  }
  
  doLogin(data: any) {
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API_SGE}/login.php`, body);
  }
  
  checkAuthentication(): Observable<boolean> {
    // Si no hay token se devuelve false
    if (!localStorage.getItem('token')) return of(false);

    const TOKEN = localStorage.getItem('token');

    return this.httpClient.get<User>(`${URL_API_SGE}/usuario.php`)
      .pipe(
        tap ( user => this.user = user), // almacenamos el usuario en la propiedad
        map ( user => !!user ), // es lo mismo que "map ( user => user? true : false)", si hay user se devuelve true, sino false
        catchError ( err => of(false))
      )
  }

  public async isAuthenticated(url: string): Promise<boolean> {
    let rutaSeleccionada: string;
    const promise = new Promise<boolean>((resolve, reject) => {

      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];

      this.http.get<ApiResponse>(`${URL_API_SGE}/check_usuarios.php?ruta=${rutaSeleccionada}`, { headers: this.commonService.getHeaders() })
        .subscribe((response: ApiResponse) => {
          resolve(response.ok);
        });
    });
    return promise;
  }

  doLogout() {
    const body = new FormData();
    const usuario = localStorage.getItem('usuario');
    if (usuario !== null) {
      body.append('user', usuario);
    } else {
      // Tratar el caso en que usuario sea null
      console.error('El usuario no está definido en el localStorage.');
      return;
    }
    // this.usersService.currentUser = undefined
    this.cookieService.deleteAll();
    localStorage.clear();

    return this.http.post(`${URL_API_SGE}/logout.php`, body);
  }

  checkPassToken(tokenPasswd: string) {
    const body = JSON.stringify({ token: tokenPasswd });
    return this.http.post<ApiResponse>(`${URL_API_SGE}/check_token_passwd.php`, body);
  }
}
