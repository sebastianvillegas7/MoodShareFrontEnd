import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { AuthGuardService } from './guards/auth.guard';

/**
 * Rutas principales de la aplicación Angular.
 */
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'moodshare',
        loadChildren: () => import('./moodshare/moodshare.module').then(m => m.MoodShareModule),
        canActivate: [AuthGuardService] // Protección de ruta con guardia de autenticación
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuardService]
      },
    ]
  },
  {
    path: '404',
    component: Error404PageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

/**
 * Módulo de enrutamiento de la aplicación.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
