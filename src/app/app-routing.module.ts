import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './layout-page/layout-page.component';
// import { AuthGuardService as AuthGuard } from './guards/auth.guard';
// import { cantActivateGuard } from './guards/reverse.guard';
// import { ReverseAuthGuard } from './guards/reverse.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      // {
      //   path: 'auth',
      //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      // },
      {
        path: '',
        loadChildren: () => import('./moodshare/moodshare.module').then(m => m.MoodShareModule),
      },
      // {
      //   path: 'users',
      //   loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      // },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '',
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
