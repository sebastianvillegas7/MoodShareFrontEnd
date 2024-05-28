import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {  // TODO: PROBAR
    path: 'favs',
    component: FavoritePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
