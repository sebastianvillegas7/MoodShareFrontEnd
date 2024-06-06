import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { UserRoleGuard } from '../guards/user-role.guard';

/**
 * Rutas principales del módulo users.
 */
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [UserRoleGuard] // Guardia de ruta para validar el rol del usuario
  },
  {
    path: 'favs/:id', // Ruta para la página de favoritos de un usuario específico
    component: FavoritePageComponent
  },
];

/**
 * Módulo de enrutamiento del módulo users.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
