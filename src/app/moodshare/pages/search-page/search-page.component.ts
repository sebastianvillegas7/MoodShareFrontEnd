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

export class SearchPageComponent implements OnInit {
  public listadoAMostrar: any[] = []; // listado a mostrar

  // Formulario para controlar los cambios del input
  public searchForm: FormGroup = new FormGroup({
    tipoDeBusqueda: new FormControl('artist'), // Valor por defecto
    busqueda: new FormControl(''),
  });

  // Variable para almacenar el número de página actual
  public paginaActual: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  constructor(public discogsService: DiscogsService) { }

  ngOnInit(): void { }

  // Método para realizar una búsqueda
  public searchItems() {
    const tipoDeBusqueda = this.searchForm.get('tipoDeBusqueda')!.value;
    const busqueda = this.searchForm.get('busqueda')!.value.trim();

    this.discogsService.listadoArtists = [];
    this.discogsService.listadoTracks = [];
    this.listadoAMostrar = [];

    this.paginaActual = 1;

    if (!busqueda.trim()) {
      return; // No realizar la búsqueda si el término está vacío
    }

    switch (tipoDeBusqueda) {
      case 'artist':
        this.discogsService.getArtistByName(busqueda).subscribe(
          (respuesta: SearchResponse<Artist>) => {
            // Almacenar los artistas en el servicio
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
        this.discogsService.getTrackByName(busqueda).subscribe(
          (respuesta: SearchResponse<Track>) => {
            // Almacenar los tracks en el servicio
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
        this.discogsService.getAlbumByName(busqueda).subscribe(
          (respuesta: SearchResponse<Album>) => {
            // Almacenar los tracks en el servicio
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

  // Método para cargar más resultados cuando se presiona el botón
  public loadMore() {
    this.paginaActual++;
    this.searchItems();
  }
}
