import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DISCOGS_API_HEADERS, URL_API_DISCOGS } from 'src/environments/environment';
import { Artist } from '../shared/interfaces/artist.interface';
import { Track } from '../shared/interfaces/track.interface';
import { SearchResponse } from '../shared/interfaces/search-response.interface';
import { Album } from '../shared/interfaces/album.interface';

/**
 * Servicio para interactuar con la API de Discogs.
 * Proporciona métodos para buscar artistas, tracks, álbumes y obtener información detallada.
 */
@Injectable({
  providedIn: 'root',
})

export class DiscogsService {
  // Propiedades para almacenar listados de resultados
  public listadoArtists: Artist[] = [];
  public listadoTracks: Track[] = [];
  public listadoAlbums: Album[] = [];
  public listadoReleases: any[] = [];

  /**
   * Constructor del servicio.
   * @param httpClient Cliente HTTP para realizar solicitudes a la API de Discogs.
   */
  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Método para obtener los últimos lanzamientos de la API de Discogs.
   * @returns Un Observable que emite un objeto de respuesta de búsqueda de álbumes.
   */
  getLastReleases(): Observable<SearchResponse<Album>> {
    // https://api.discogs.com/database/search?type=release&sort=year,desc&per_page=20&page=1
    let randomPage = Math.floor(Math.random() * 10) + 1;
    return this.httpClient.get<SearchResponse<Album>>(`${URL_API_DISCOGS}database/search?type=release&sort=year,desc&per_page=20&page=${randomPage}`, DISCOGS_API_HEADERS);
  }

/******************** ARTIST ********************/
   /**
   * Método que realiza la búsqueda por nombre de artista.
   * @returns Un Observable que emite un objeto de respuesta de búsqueda de artists.
   */
  getArtistByName(nameArtist: string, page: number): Observable<SearchResponse<Artist>> {
    const busquedaTrim = nameArtist.toLowerCase().trim();
    return this.httpClient.get<SearchResponse<Artist>>(`${URL_API_DISCOGS}database/search?q=${busquedaTrim}&type=artist&per_page=20&page=${page}`, DISCOGS_API_HEADERS);
  }

  /**
  * Método que realiza la búsqueda de información de un artista por su id.
  * @returns Un Observable que emite un objeto de información de un artist.
  */
  getInfoArtistById(artistId: number | string):  Observable<SearchResponse<Artist>> {
    // https://api.discogs.com/artists/{artist_id}
    return this.httpClient.get<SearchResponse<Artist>>(`${URL_API_DISCOGS}artists/${artistId}`, DISCOGS_API_HEADERS);
  }

/******************** TRACK ********************/
   /**
   * Método que realiza la búsqueda por nombre de cancion.
   * @returns Un Observable que emite un objeto de respuesta de búsqueda de track.
   */
  getTrackByName(trackName: string, page: number): Observable<SearchResponse<Track>> {
    const busquedaTrim = trackName.toLowerCase().trim();
    // https://api.discogs.com/database/search?track=smells like teen spirit&per_page=3&page=1
    return this.httpClient.get<SearchResponse<Track>>(`${URL_API_DISCOGS}database/search?track=${busquedaTrim}&per_page=20&page=${page}`, DISCOGS_API_HEADERS);
  }

  /**
  * Método que realiza la búsqueda de información de canciones por su id.
  * @returns Un Observable que emite un objeto de información de un album.
  */
  getReleaseById(releaseId: number | string) {
    // https://api.discogs.com/releases/{release_id}
    return this.httpClient.get<SearchResponse<Album>>(`${URL_API_DISCOGS}releases/${releaseId}`, DISCOGS_API_HEADERS);
  }

/******************** ALBUM ********************/
  /**
   * Método que realiza la búsqueda por nombre de album.
   * @returns Un Observable que emite un objeto de respuesta de búsqueda de album.
   */
  getAlbumByName(nameAlbum: string, page: number): Observable<SearchResponse<Album>> {
    const busquedaTrim = nameAlbum.toLowerCase().trim();
    // https://api.discogs.com/database/search?release_title=the wall&per_page=5&page=1
    return this.httpClient.get<SearchResponse<Album>>(`${URL_API_DISCOGS}database/search?release_title=${busquedaTrim}&per_page=20&page=${page}`, DISCOGS_API_HEADERS);
  }

  /**
  * Método que realiza la búsqueda de información de album por su id.
  * @returns Un Observable que emite un objeto de información de un album.
  */
  getMasterById(masterId: number | string) {
    // https://api.discogs.com/masters/{master_id}
    return this.httpClient.get<SearchResponse<Album>>(`${URL_API_DISCOGS}masters/${masterId}`, DISCOGS_API_HEADERS);
  }

  getMasterByName(nameMaster: number | string, page: number) {
    // https://api.discogs.com/database/search?type=master&q={nombre_del_master}
    return this.httpClient.get<SearchResponse<Album>>(`${URL_API_DISCOGS}database/search?type=master&q=${nameMaster}&per_page=20&page=${page}`, DISCOGS_API_HEADERS);
  }

  /******************** RESOURCE DATA ********************/
  /**
   * Método para obtener información detallada de un recurso a través de su URL.
   * @param resourceUrl La URL del recurso del que se desea obtener información.
   * @returns Un Observable que emite la información del recurso.
   */
  getResourceDataByUrl(resourceUrl: string): Observable<any> {
    return this.httpClient.get<any>(resourceUrl, DISCOGS_API_HEADERS);
  }

  /******************** ARTIST RELEASES ********************/
  getArtistReleases(artistId: number | string): Observable<any> {
    return this.httpClient.get<any>(`${URL_API_DISCOGS}artists/${artistId}/releases`, DISCOGS_API_HEADERS);
  }
}

