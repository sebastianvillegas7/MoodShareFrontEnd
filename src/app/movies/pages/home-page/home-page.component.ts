import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LastFMService } from 'src/app/services/lasftm.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { SearchResponseArtist } from 'src/app/shared/interfaces/search-response-artist.interface';

@Component({
  selector: 'movies-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {
  permises!: Permises | null;

  constructor(
    public lastfmService: LastFMService,
    // public usersService: UsersService,
    ) { }

  ngOnInit(): void {
    // this.usersService.setUserByToken();
    this.searchTrending();
  }

  // Método para buscar los trending charts que se muestran en el home page
  public searchTrending() {
    this.lastfmService.getTopChartsArtists().subscribe(
      (respuesta: SearchResponseArtist) => {  
        // Accede a los artistas dentro de la respuesta JSON
        const artistas = respuesta.artists.artist;
  
        // Almacena los artistas en la variable 'listadoArtists' del servicio
        this.lastfmService.listadoArtists = [...this.lastfmService.listadoArtists, ...artistas];
        // this.listaver = [ artistas ];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }
  
}
