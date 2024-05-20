import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LastFMService } from 'src/app/services/lasftm.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { SearchResponseArtist } from 'src/app/shared/interfaces/search-response-artist.interface';
import { SearchResponseTrack } from 'src/app/shared/interfaces/search-response-track.interface';

@Component({
  selector: 'moodshare-home-page',
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
    this.lastfmService.getLastReleases().subscribe(
      (respuesta: SearchResponseTrack) => {
        // Accede a los artistas dentro de la respuesta JSON
        const TRACKS = respuesta.results.trackmatches.track;

        // Almacena los tracks en la variable 'listadoTracks' del servicio
        this.lastfmService.listadoTracks = [...this.lastfmService.listadoTracks, ...TRACKS];
        console.log(this.lastfmService.listadoTracks);
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

}

// artistas.forEach(artist => {
//   if (artist.mbid != null) {
//     this.wikiService.getArtistImage(artist.mbid).subscribe(
//       (response: any) => {
//         // Extraemos la URL de la imagen de la respuesta de Wikipedia
//         const pages = response.query.pages;
//         const pageId = Object.keys(pages)[0];
//         const imageUrl = pages[pageId].original.source;

//         // Agregamos la URL de la imagen al objeto del artista
//         artist.imageUrl = imageUrl;
//         console.log(imageUrl);


//         // Agregamos el artista con la imagen al listado
//         this.listadoArtists.push(artist);
//       },
//       error => {
//         console.error('Error al obtener la imagen del artista desde Wikipedia:', error);
//       }
//     );
//   }
// });

// this.lastfmService.listadoArtists = this.listadoArtists;
