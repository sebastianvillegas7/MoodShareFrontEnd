import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../shared/interfaces/movie.interface';
import { Observable, forkJoin, map, of } from 'rxjs';
import { SearchResponse } from '../shared/interfaces/search-response.interface';
import { URL_API_MOVIES, MOVIES_API_HEADERS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public listadoMovies: Movie[] = [];

  constructor(private http: HttpClient) { }

  // Método que realiza la búsqueda por título y número de página
  getMoviesByQuery(busqueda: string, page: number): Observable<SearchResponse> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();
    return this.http.get<SearchResponse>(
      `${URL_API_MOVIES}search/movie?query=${busquedaTrim}&page=${page}`,
      MOVIES_API_HEADERS
    );
  }

  // Método que realiza la búsqueda por titulo
  getMovieByID(id: number | string): Observable<any> {
    return this.http.get<SearchResponse>(`${URL_API_MOVIES}movie/${id}`, MOVIES_API_HEADERS);
  }

  // Método para buscar las peliculas trending que se muestran en el home page
  getTrendingMovies(): Observable<SearchResponse> {
    let randomPage = Math.floor(Math.random() * 500) + 1;
    return this.http.get<SearchResponse>(`${URL_API_MOVIES}trending/movie/week?language=en-US&page=${randomPage}`, MOVIES_API_HEADERS);
  }
}

