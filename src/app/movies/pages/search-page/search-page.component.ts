import { Component, HostListener, OnInit, ElementRef  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'movies-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})

export class SearchPageComponent implements OnInit {
  // Formulario para controlar los cambios del input
  public searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });

  // Variable para almacenar el número de página actual
  public paginaActual: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  constructor(
        public moviesService: MovieService,
        private elementRef: ElementRef
      ) { }

  ngOnInit(): void {   }

  // Método para realizar una búsqueda
  public searchMovies() {
    const busqueda = this.searchForm.get('searchInput')!.value;
    if (!busqueda.trim()) {
      return; // No realizar la búsqueda si el término está vacío
    }

    // Se limpian las peliculas almacenadas en la variable del servicio
    // para mostrar el resultado de la búsqueda
    this.moviesService.listadoMovies = [];

    this.paginaActual = 1; // Reiniciar el número de página a 1 al realizar una nueva búsqueda

    // Llamar al método para obtener los resultados de la primera página
    this.loadMovies();
  }

  // Método para obtener los resultados de la página actual
  private loadMovies() {
      const busqueda = this.searchForm.get('searchInput')!.value;

      this.moviesService.getMoviesByQuery(busqueda, this.paginaActual).subscribe(
      (respuesta) => {
        // Almacenar los resultados en la variable 'listadoMovies' del servicio
        // agregando, a los ya mostrados, los resultados de la nueva pagina
        this.moviesService.listadoMovies = [ ...this.moviesService.listadoMovies, ...respuesta.results ];
        this.showLoadMoreBtn = true; // Mostrar el botón después de cargar al menos una página de resultados
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
      );
  }

  // Método para cargar más resultados cuando se presiona el botón
  public loadMoreMovies() {
    this.paginaActual++; 
    this.loadMovies();
  }
}
