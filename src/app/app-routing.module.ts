import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
import { AuthGuardService as AuthGuard } from './guards/auth.guard';
import { cantActivateGuard } from './guards/reverse.guard';
// import { ReverseAuthGuard } from './guards/reverse.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        // canActivate: [cantActivateGuard],
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
        canActivate: [AuthGuard] // funciona ok de afuera para adentro
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
