import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { MoodShareModule } from '../moodshare/moodshare.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';



@NgModule({
  declarations: [ UsersComponent, AddUserComponent, EditUserComponent, DeleteUserComponent, ProfilePageComponent, FavoritePageComponent ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    MoodShareModule,
    MatDialogModule,
    MatTabsModule,
  ],
  exports: [
    ProfilePageComponent // agregado
  ]
})
export class UsersModule { }