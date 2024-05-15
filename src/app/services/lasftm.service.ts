import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResponseArtist } from '../shared/interfaces/search-response-artist.interface';
import { API_KEY_LASTFM, URL_API_LASTFM } from 'src/environments/environment';
import { Artist } from '../shared/interfaces/artist.interface';
import { SearchResponseTrack } from '../shared/interfaces/search-response-track.interface';
import { Track } from '../shared/interfaces/track.interface';
import { SearchResponseAlbum } from '../shared/interfaces/search-response-album.interface';

@Injectable({
  providedIn: 'root',
})

export class LastFMService {
  public listadoArtists: Artist[] = [];
  public listadoTracks: Track[] = [];
  // public listadoAlbums: Artist[] = [];

  constructor(private http: HttpClient) { }

  // Método para buscar los trending charts que se muestran en el home page
  getTopChartsTracks(): Observable<SearchResponseTrack> {    
    // https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseTrack>(`${URL_API_LASTFM}?method=chart.gettoptracks&api_key=${API_KEY_LASTFM}&format=json`);
    
  }



  /******************** ARTIST ********************/
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



  /******************** TRACK ********************/
  getTrackByName(nameTrack: string): Observable<SearchResponseTrack> {
    const busquedaTrim = nameTrack.toLowerCase().trim();
    // https://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseTrack>(`${URL_API_LASTFM}?method=track.search&track=${busquedaTrim}&api_key=${API_KEY_LASTFM}&format=json`);
  }

  getInfoTrack(nameTrack: string): Observable<SearchResponseTrack> {
    // https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseTrack>(`${URL_API_LASTFM}?method=artist.getinfo&artist=${nameTrack}&api_key=${API_KEY_LASTFM}&format=json`);
  }

  getSimilarTracks(nameTrack: string): Observable<SearchResponseTrack> {
    // https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=cher&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseTrack>(`${URL_API_LASTFM}?method=artist.getsimilar&artist=${nameTrack}&api_key=${API_KEY_LASTFM}&format=json`);
  }



  /******************** ALBUM ********************/
  getAlbumByName(nameAlbum: string): Observable<SearchResponseAlbum> {
    const busquedaTrim = nameAlbum.toLowerCase().trim();
    // https://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=YOUR_API_KEY&format=json
    return this.http.get<SearchResponseAlbum>(`${URL_API_LASTFM}?method=album.search&album=${busquedaTrim}&api_key=${API_KEY_LASTFM}&format=json`);
  }

  // getInfoAlbum(nameAlbum: string): Observable<SearchResponseAlbum> {
    // https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=YOUR_API_KEY&format=json
    // return this.http.get<SearchResponseAlbum>(`${URL_API_LASTFM}?method=artist.getinfo&artist=${nameAlbum}&api_key=${API_KEY_LASTFM}&format=json`);
  }
}

