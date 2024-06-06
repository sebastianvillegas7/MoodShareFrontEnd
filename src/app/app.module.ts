import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilePageComponent } from './users/profile-page/profile-page.component';

/**
 * Módulo principal de la aplicación MoodShare.
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule, // Módulo compartido con componentes reutilizables
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    AuthModule, // Módulo de autenticación
    UsersModule // Módulo de gestión de usuarios
  ],
  exports: [
    ProfilePageComponent // Componente de perfil de usuario exportado para su uso en otros módulos
  ],
  providers: [
    AuthService, // Servicio de autenticación
    {
      provide: HTTP_INTERCEPTORS, // Proveedor de interceptores HTTP
      useClass: AuthInterceptor, // Clase del interceptor de autenticación
      multi: true // Permite múltiples interceptores
    }
  ],
  bootstrap: [AppComponent] // Componente principal que se arranca al iniciar la aplicación
})
export class AppModule { }
