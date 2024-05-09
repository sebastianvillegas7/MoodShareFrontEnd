import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
// import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LayoutPageComponent } from '../layout-page/layout-page.component';
// import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { ListPageComponent } from './pages/list-page/list-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    ListPageComponent,
    // SearchPageComponent,
    // DetailPageComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule
    // UsersModule              verificar
  ],
  exports: [ListPageComponent]
})
export class MoviesModule { }
