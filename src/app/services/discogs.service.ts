import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DISCOGS_API_HEADERS, URL_API_DISCOGS } from 'src/environments/environment';
import { Artist } from '../shared/interfaces/artist.interface';
import { Track } from '../shared/interfaces/track.interface';
import { SearchResponse } from '../shared/interfaces/search-response.interface';
import { Album } from '../shared/interfaces/album.interface';

@Injectable({
  providedIn: 'root',
})

export class DiscogsService {
  public listadoArtists: Artist[] = [];
  public listadoTracks: Track[] = [];
  public listadoAlbums: Album[] = [];
  public listadoReleases: any[] = [];

  constructor(private http: HttpClient) { }

  // Método para buscar los releases aleatorios que se muestran en el home page
  getLastReleases(): Observable<SearchResponse<Album>> {
    // https://api.discogs.com/database/search?type=release&sort=year,desc&per_page=20&page=1
    let randomPage = Math.floor(Math.random() * 10) + 1;
    return this.http.get<SearchResponse<Album>>(`${URL_API_DISCOGS}database/search?type=release&sort=year,desc&per_page=20&page=${randomPage}`, DISCOGS_API_HEADERS);
  }

  /******************** ARTIST ********************/
  // Método que realiza la búsqueda por nombre de artista
  getArtistByName(nameArtist: string): Observable<SearchResponse<Artist>> {
    const busquedaTrim = nameArtist.toLowerCase().trim();
    // https://api.discogs.com/database/search?q=artist_name&type=artist
    return this.http.get<SearchResponse<Artist>>(`${URL_API_DISCOGS}database/search?q=${busquedaTrim}&type=artist`, DISCOGS_API_HEADERS);
  }

  // Método que realiza la búsqueda de información de un artista
  getInfoArtist(artistId: number):  Observable<SearchResponse<Artist>> {
    // https://api.discogs.com/artists/{artist_id}
    return this.http.get<SearchResponse<Artist>>(`${URL_API_DISCOGS}artists/${artistId}`, DISCOGS_API_HEADERS);
  }

  // /******************** TRACK ********************/
  getTrackByName(trackName: string): Observable<SearchResponse<Track>> {
    const busquedaTrim = trackName.toLowerCase().trim();
    // https://api.discogs.com/database/search?track=smells like teen spirit&per_page=3&page=1
    return this.http.get<SearchResponse<Track>>(`${URL_API_DISCOGS}database/search?track=${busquedaTrim}&per_page=20&page=1`, DISCOGS_API_HEADERS);
  }

  // /******************** ALBUM ********************/
  getAlbumByName(nameAlbum: string): Observable<SearchResponse<Album>> {
    const busquedaTrim = nameAlbum.toLowerCase().trim();
    // https://api.discogs.com/database/search?release_title=the wall&per_page=5&page=1
    return this.http.get<SearchResponse<Album>>(`${URL_API_DISCOGS}database//search?release_title=${busquedaTrim}&per_page=20&page=1`, DISCOGS_API_HEADERS);
  }

  /******************** RESOURCE DATA ********************/
  getResourceDataByUrl(resourceUrl: string): Observable<any> {
    return this.http.get<any>(resourceUrl, DISCOGS_API_HEADERS);
  }

  /******************** ARTIST RELEASES ********************/
  getArtistReleases(artistId: number): Observable<any> {
    return this.http.get<any>(`${URL_API_DISCOGS}artists/${artistId}/releases`, DISCOGS_API_HEADERS);
  }
}

