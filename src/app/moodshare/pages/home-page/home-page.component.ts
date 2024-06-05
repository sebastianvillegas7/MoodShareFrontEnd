import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscogsService } from 'src/app/services/discogs.service';
import { FavService } from 'src/app/services/fav.service';
import { UsersService } from 'src/app/services/users.service';
import { Album } from 'src/app/shared/interfaces/album.interface';
import { SearchResponse } from 'src/app/shared/interfaces/search-response.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'moodshare-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  public paginaActual: number = 1;
  public showLoadMoreBtn: boolean = false;
  public listaUsers: User[] = [];
  private intervalId: any;
  private requestId: number = 0;

  constructor(
    public discogsService: DiscogsService,
    public usersService: UsersService,
    private favService: FavService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.searchTrending();
    this.adjustInitialScroll();
  }

  // Método para obtener los usuarios y mostrarlos al inicio
  public obtenerUsuarios() {
    this.usersService.getUsers().subscribe(
      (data: User[]) => {
        this.listaUsers = data;
      });
  }

  verFavs(idUsuario: string | number, userName: string) {
    this.router.navigate(['/users/favs', idUsuario], { state: { userName: userName } });
  }

  // Método para buscar los trending charts que se muestran en el home page
  public searchTrending() {
    this.discogsService.getLastReleases().subscribe(
      (respuesta: SearchResponse<Album>) => {
        const ALBUMS_TREND = respuesta.results;
        // Almacena los resultados en la variable 'listadoAlbums' del servicio
        this.discogsService.listadoAlbums = [...this.discogsService.listadoAlbums, ...ALBUMS_TREND];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

  // Métodos necesarios para el desplazamiento horizontal de la lista de usuario
  adjustInitialScroll() {
    const container = document.getElementById('user-list-container');
    if (container) {
      container.scrollLeft = container.scrollWidth / 2; // Ajusta para que la primera tarjeta esté en el centro
    }
  }

  startDrag(event: MouseEvent) {
    const slider = document.querySelector('.user-list');
    if (slider instanceof HTMLElement) {
      let isDown = false;
      let startX: number;
      let scrollLeft: number;

      slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
      });

      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // Ajusta la velocidad de desplazamiento
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }
}
