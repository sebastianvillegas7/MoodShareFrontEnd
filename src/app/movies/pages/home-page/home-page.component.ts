import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { UsersService } from 'src/app/services/users.service';
import { Permises } from 'src/app/shared/interfaces/api-response.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'movies-home-page',
  templateUrl: './home-page.component.html'
})

export class HomePageComponent implements OnInit {

  permises!: Permises | null;

  constructor(
    public moviesService: MovieService,
    public usersService: UsersService,
    ) { }

  ngOnInit(): void {
    this.usersService.setUserByToken();
    this.searchTrending();
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  public searchTrending() {
    this.moviesService.getTrendingMovies().subscribe(
      respuesta => {
        // Almacena los resultados en la variable 'listadoMovies' del servicio
        this.moviesService.listadoMovies = [ ...this.moviesService.listadoMovies, ...respuesta.results ];
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
      }
    )
  }
}
