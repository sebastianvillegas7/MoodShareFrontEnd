import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DiscogsService } from 'src/app/services/discogs.service';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { SearchResponse } from 'src/app/shared/interfaces/search-response.interface';

@Component({
  selector: 'moodshare-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  constructor(
    public lastfmService: DiscogsService,
    // public usersService: UsersService,
    ) { }

  ngOnInit(): void {
    // this.usersService.setUserByToken();
    this.searchTrending();
  }


  // Método para buscar los trending charts que se muestran en el home page
  public searchTrending() {
    this.lastfmService.listadoAlbums = [];

    this.lastfmService.getLastReleases().subscribe(
      (respuesta: SearchResponse<Album>) => {
        // Accede a los Albums dentro de la respuesta JSON
        const ALBUMS_TREND = respuesta.results;

        // Almacena los tracks en la variable 'listadoTracks' del servicio
        this.lastfmService.listadoAlbums = [...this.lastfmService.listadoAlbums, ...ALBUMS_TREND];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

}
