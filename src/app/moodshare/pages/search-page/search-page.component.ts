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

export class SearchPageComponent {
  public listadoAMostrar: any[] = []; // listado a mostrar

  // Formulario para controlar los cambios del input
  public searchForm: FormGroup = new FormGroup({
    tipoDeBusqueda: new FormControl('artist'),
    busqueda: new FormControl(''),
  });

  // Variable para almacenar el número de página actual
  public paginaActual: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  public tipoDeBusqueda: string = "";
  public busqueda: string = "";

  constructor(
    public discogsService: DiscogsService
  ) { }

  // Método para realizar una búsqueda
  public searchItems() {
    this.tipoDeBusqueda = this.searchForm.get('tipoDeBusqueda')!.value;
    this.busqueda = this.searchForm.get('busqueda')!.value.trim();
    if (!this.busqueda.trim()) {
      return;
    }

    this.discogsService.listadoArtists = [];
    this.discogsService.listadoTracks = [];
    this.listadoAMostrar = [];
    this.paginaActual = 1;

    this.loadItems(this.tipoDeBusqueda, this.busqueda);
  }

  // Método para obtener los resultados de la página actual
  private loadItems(tipoDeBusqueda: string, busqueda: string) {
    switch (tipoDeBusqueda) {
      case 'artist':
        this.discogsService.getArtistByName(busqueda, this.paginaActual).subscribe(
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
          this.discogsService.getTrackByName(busqueda, this.paginaActual).subscribe(
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
          this.discogsService.getAlbumByName(busqueda, this.paginaActual).subscribe(
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
        this.loadItems(this.tipoDeBusqueda, this.busqueda);
      }
    }
