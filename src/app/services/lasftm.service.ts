import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponseArtist } from '../shared/interfaces/search-response-artist.interface';
import { API_KEY_LASTFM, URL_API_LASTFM } from 'src/environments/environment';
import { Artist } from '../shared/interfaces/artist.interface';

@Injectable({
  providedIn: 'root',
})

export class LastFMService {
  public listadoArtists: Artist[] = [];
  // public listadoTracks: Artist[] = [];
  // public listadoAlbums: Artist[] = [];

  constructor(private http: HttpClient) { }

  /* ARTIST */
  // Método que realiza la búsqueda por nombre de artista
  getArtistByName(nameArtist: string): Observable<SearchResponseArtist> {
    const busquedaTrim = nameArtist.toLowerCase().trim();
    // https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseArtist>(`${URL_API_LASTFM}?method=artist.search&artist=${busquedaTrim}&api_key=${API_KEY_LASTFM}&format=json`);
  }

  // Método que realiza la búsqueda de información de un artista
  getInfoArtist(nameArtist: string): Observable<SearchResponseArtist> {
    // https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseArtist>(`${URL_API_LASTFM}?method=artist.getinfo&artist=${nameArtist}&api_key=${API_KEY_LASTFM}&format=json`);
  }

  // Método que obtiene artistas similares al buscado
  getSimilarArtists(nameArtist: string): Observable<SearchResponseArtist> {
    // https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=cher&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseArtist>(`${URL_API_LASTFM}?method=artist.getsimilar&artist=${nameArtist}&api_key=${API_KEY_LASTFM}&format=json`);
  }

  // Método para buscar los trending charts que se muestran en el home page
  getTopChartsArtists(): Observable<SearchResponseArtist> {    
    // https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=YOUR_API_KEY&format=json    
    return this.http.get<SearchResponseArtist>(`${URL_API_LASTFM}?method=chart.gettopartists&api_key=${API_KEY_LASTFM}&format=json`);
    
  }

  /* TRACK */

  /* ALBUM */
}

