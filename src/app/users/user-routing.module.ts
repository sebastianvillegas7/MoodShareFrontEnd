import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { UserRoleGuard } from '../guards/user-role.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: 'favs/:id',
    component: FavoritePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
