import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { MoodShareModule } from '../moodshare/moodshare.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FavoritePageComponent } from './favorite-page/favorite-page.component';
import { AdminFavoritesComponent } from './admin-favorites/admin-favorites.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    ProfilePageComponent,
    FavoritePageComponent,
    AdminFavoritesComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    MoodShareModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatPaginatorModule,
    FormsModule
  ],
  exports: [
    ProfilePageComponent,
    AdminFavoritesComponent
  ]
})
export class UsersModule { }
