import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { URL_API_BACKEND } from 'src/environments/environment';

/**
 * Interceptor para agregar el token de autenticación a las solicitudes HTTP.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructor del interceptor de autenticación.
   *
   * @param authService El servicio de autenticación.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método intercept para manipular solicitudes HTTP y agregar el token de autenticación.
   *
   * @param request La solicitud HTTP.
   * @param next El siguiente manejador de la solicitud.
   * @returns Un Observable con el evento HTTP.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verificar si la solicitud es para el backend o para la API de Discogs
    if (request.url.startsWith(URL_API_BACKEND)) {
      const token = this.authService.getToken();

      if (token) {
        // Clonar la solicitud y agregar el encabezado de autorización
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(request);
  }
}
