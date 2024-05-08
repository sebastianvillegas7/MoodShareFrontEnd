import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'movies-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

export class ListPageComponent {
  @Input()
  public listadoMovies: Movie[] = [];

  constructor( private router: Router ) { }

  ngOnInit(): void {

  }

  updateListadoMovies(movies: Movie[]) {
    this.listadoMovies = movies;
  }

  verDetalle(id: number) {
    this.router.navigate(['/detail/', id]);
  }
}
