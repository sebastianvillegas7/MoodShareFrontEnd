import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'detail', component: DetailPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MoodShareRoutingModule { }
