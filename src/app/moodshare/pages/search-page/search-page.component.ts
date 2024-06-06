import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DiscogsService } from 'src/app/services/discogs.service';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { Artist } from 'src/app/shared/interfaces/artist.interface';
import { SearchResponse } from 'src/app/shared/interfaces/search-response.interface';
import { Track } from 'src/app/shared/interfaces/track.interface';

@Component({
  selector: 'moodshare-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})

/**
 * Este componente se encarga de realizar búsquedas de artistas, tracks
 * y álbumes en la API de Discogs.
 */
export class SearchPageComponent {
  public listadoAMostrar: any[] = []; // Listado a mostrar

  // Formulario para controlar los cambios del input
  public searchForm: FormGroup = new FormGroup({
    tipoDeBusqueda: new FormControl('artist'), // Tipo de búsqueda por defecto: artist
    busqueda: new FormControl(''),
  });

  public paginaActual: number = 1;
  public showLoadMoreBtn: boolean = false;

  public tipoDeBusqueda: string = "";
  public busqueda: string = "";

  constructor(
    public discogsService: DiscogsService,
  ) { }

  /**
   * Método para realizar una búsqueda.
   * Se obtienen los parámetros de búsqueda del formulario y se llama al método para cargar los resultados.
   */
  public searchItems() {
    this.tipoDeBusqueda = this.searchForm.get('tipoDeBusqueda')!.value;
    this.busqueda = this.searchForm.get('busqueda')!.value.trim();
    if (!this.busqueda.trim()) {
      return;
    }

    // Reiniciar listas y página actual
    this.discogsService.listadoArtists = [];
    this.discogsService.listadoTracks = [];
    this.discogsService.listadoAlbums = [];
    this.listadoAMostrar = [];
    this.paginaActual = 1;

    this.loadItems(this.tipoDeBusqueda, this.busqueda);
  }

  /**
   * Método privado para obtener los resultados de la página actual.
   * @param tipoDeBusqueda Tipo de búsqueda: artist, track o album.
   * @param busqueda Término de búsqueda.
   */
  private loadItems(tipoDeBusqueda: string, busqueda: string) {
    switch (tipoDeBusqueda) {
      case 'artist':
        // Obtener artistas por nombre
        this.discogsService.getArtistByName(busqueda, this.paginaActual).subscribe(
          (respuesta: SearchResponse<Artist>) => {
            // Almacenar los artistas en el servicio y mostrarlos
            this.discogsService.listadoArtists = [...this.discogsService.listadoArtists, ...respuesta.results];
            this.listadoAMostrar = this.discogsService.listadoArtists;
            this.showLoadMoreBtn = true;
          },
          error => {
            console.error('Error en la solicitud HTTP:', error);
          }
        );
        break;
      case 'track':
        // Obtener tracks por nombre
        this.discogsService.getTrackByName(busqueda, this.paginaActual).subscribe(
          (respuesta: SearchResponse<Track>) => {
            // Almacenar los tracks en el servicio y mostrarlos
            this.discogsService.listadoTracks = [...this.discogsService.listadoTracks, ...respuesta.results];
            this.listadoAMostrar = this.discogsService.listadoTracks;
            this.showLoadMoreBtn = true;
          },
          error => {
            console.error('Error en la solicitud HTTP:', error);
          }
        );
        break;
      case 'album':
        // Obtener álbumes por nombre
        this.discogsService.getMasterByName(busqueda, this.paginaActual).subscribe(
          (respuesta: SearchResponse<Album>) => {
            // Almacenar los álbumes en el servicio y mostrarlos
            this.discogsService.listadoAlbums = [...this.discogsService.listadoAlbums, ...respuesta.results];
            this.listadoAMostrar = this.discogsService.listadoAlbums;
            this.showLoadMoreBtn = true;
          },
          error => {
            console.error('Error en la solicitud HTTP:', error);
          }
        );
        break;
    }
  }

  /**
   * Método para cargar más resultados cuando se presiona el botón.
   */
  public loadMore() {
    this.paginaActual++;
    this.loadItems(this.tipoDeBusqueda, this.busqueda);
  }
}
