import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { AdminFavoritesComponent } from './admin-favorites/admin-favorites.component';

/**
 * Rutas principales del módulo users.
 */
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [UserRoleGuard] // Guardia de ruta para validar el rol de ADMIN
  },
  {
    path: 'favs/:id', // Ruta para la página de favoritos de un usuario específico
    component: FavoritePageComponent
  },
  {
    path: 'favs-manager', // Ruta para la administración de favoritos, solo accesible para el rol ADMIN
    component: AdminFavoritesComponent,
    canActivate: [UserRoleGuard] // Guardia de ruta para validar el rol de ADMIN
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
