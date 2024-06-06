import { RouterModule, Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

/**
 * Rutas de autenticación de la aplicación.
 */
const routes: Routes = [
      { path: '', component: LoginPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'registro', component: RegisterPageComponent }
];

/**
 * Módulo de enrutamiento para autenticación.
 */
@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})

export class AuthRoutingModule { }
