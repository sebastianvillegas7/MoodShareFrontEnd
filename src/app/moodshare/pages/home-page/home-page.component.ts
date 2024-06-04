import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DiscogsService } from 'src/app/services/discogs.service';
import { FavService } from 'src/app/services/fav.service';
import { UsersService } from 'src/app/services/users.service';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { SearchResponse } from 'src/app/shared/interfaces/search-response.interface';

@Component({
  selector: 'moodshare-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  // Variable para almacenar el número de página actual
  public paginaActual: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  constructor(
    public discogsService: DiscogsService,
    public usersService: UsersService,
    private favService: FavService,
    ) { }

  ngOnInit(): void {
    this.searchTrending();
    // this.favService.getUserFavoriteIds(localStorage.getItem('id_usuario')!);
  }


  // Método para buscar los trending charts que se muestran en el home page
  public searchTrending() {
    this.discogsService.getLastReleases().subscribe(
      (respuesta: SearchResponse<Album>) => {
        const ALBUMS_TREND = respuesta.results;
        // Almacena los resultados en la variable 'listadoAlbums' del servicio
        this.discogsService.listadoAlbums = [ ...this.discogsService.listadoAlbums, ...ALBUMS_TREND];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }
}
