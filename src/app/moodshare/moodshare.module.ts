import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoodShareRoutingModule } from './moodshare-routing.module';
import { LayoutPageComponent } from '../layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DefaultImagePipe } from '../shared/pipes/default-image.pipe';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

/**
 * Módulo para gestionar los datos de la API de Discogs.
 */
@NgModule({
  declarations: [
    LayoutPageComponent,
    HomePageComponent,
    ListPageComponent,
    SearchPageComponent,
    DefaultImagePipe,
    DetailPageComponent
  ],
  imports: [
    CommonModule,
    MoodShareRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [ListPageComponent]
})

export class MoodShareModule { }
