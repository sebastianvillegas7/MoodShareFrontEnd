import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LastFMService } from 'src/app/services/lasftm.service';
import { SearchResponseArtist } from 'src/app/shared/interfaces/search-response-artist.interface';
import { SearchResponseTrack } from 'src/app/shared/interfaces/search-response-track.interface';

@Component({
  selector: 'moodshare-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})

export class SearchPageComponent implements OnInit {
  // Formulario para controlar los cambios del input
  public searchForm: FormGroup = new FormGroup({
    tipoDeBusqueda: new FormControl('artist'), // Valor por defecto
    busqueda: new FormControl(''),
  });

  // Variable para almacenar el número de página actual
  public paginaActual: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  constructor(public lastfmService: LastFMService) { }

  ngOnInit(): void { }

  // Método para realizar una búsqueda
  public searchItems() {
    const tipoDeBusqueda = this.searchForm.get('tipoDeBusqueda')!.value;
    const busqueda = this.searchForm.get('busqueda')!.value.trim();

    this.lastfmService.listadoArtists = [];

    if (!busqueda.trim()) {
      return; // No realizar la búsqueda si el término está vacío
    }

    switch (tipoDeBusqueda) {
      case 'artist':
        this.lastfmService.getArtistByName(busqueda).subscribe(
          (respuesta: SearchResponseArtist) => {
            // Almacenar los artistas en el servicio
            this.lastfmService.listadoArtists = [...this.lastfmService.listadoArtists, ...respuesta.results.artistmatches.artist];
            this.showLoadMoreBtn = true;
          },
          error => {
            console.error('Error en la solicitud HTTP:', error);
          }
        );
        break;
      case 'track':
        this.lastfmService.getTrackByName(busqueda).subscribe(
          (respuesta: SearchResponseTrack) => {
            // Almacenar los tracks en el servicio
            this.lastfmService.listadoTracks = [...this.lastfmService.listadoTracks, ...respuesta.results.trackmatches.track];
            this.showLoadMoreBtn = true;
          },
          error => {
            console.error('Error en la solicitud HTTP:', error);
          }
        );
        break;
      case 'album':
        // this.lastfmService.searchAlbums(searchTerm);
        break;
      default:
        break;
    }
  }

  // Método para cargar más resultados cuando se presiona el botón
  public loadMore() {
    this.paginaActual++;
    this.searchItems();
  }
}
