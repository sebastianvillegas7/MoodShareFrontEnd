import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DiscogsService } from 'src/app/services/discogs.service';
import { UsersService } from 'src/app/services/users.service';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { SearchResponse } from 'src/app/shared/interfaces/search-response.interface';

@Component({
  selector: 'moodshare-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  constructor(
    public discogsService: DiscogsService,
    public usersService: UsersService,
    ) { }

  ngOnInit(): void {
    this.usersService.setUserById();
    this.searchTrending();
  }


  // Método para buscar los trending charts que se muestran en el home page
  public searchTrending() {
    this.discogsService.listadoAlbums = [];

    this.discogsService.getLastReleases().subscribe(
      (respuesta: SearchResponse<Album>) => {
        // Accede a los Albums dentro de la respuesta JSON
        const ALBUMS_TREND = respuesta.results;

        // Almacena los tracks en la variable 'listadoTracks' del servicio
        this.discogsService.listadoAlbums = [...this.discogsService.listadoAlbums, ...ALBUMS_TREND];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

}
