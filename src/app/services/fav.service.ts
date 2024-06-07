import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BASE_BACKEND } from 'src/environments/environment';
import { Favorite } from '../shared/interfaces/favorite.interface';

const ENDPOINT = 'favs';

/**
 * Servicio para interactuar con la API de SpringBoot y gestionar favoritos de usuarios.
 * Permite obtener, agregar y eliminar favoritos de los usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class FavService {
  idsFavoritesDelUsuario: string[] = [];

  /**
   * Constructor del servicio.
   * @param httpClient Cliente HTTP para realizar solicitudes a la API.
   */
  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * Método para obtener los favoritos de un usuario.
   * @param idUsuario El ID del usuario del que se desean obtener los favoritos.
   * @returns Un Observable que emite un array de favoritos.
   */
  getFavs(idUsuario: number | string) {
    return this.httpClient.get<Favorite[]>(`${URL_BASE_BACKEND}/${ENDPOINT}/${idUsuario}`);
  }

  /**
   * Método para obtener todos los favoritos de la BBDD.
   * @returns Un Observable que emite un array de todos los favoritos.
   */
    getAllFavs() {
      return this.httpClient.get<Favorite[]>(`${URL_BASE_BACKEND}/${ENDPOINT}`);
    }

  /**
   * Método para agregar un nuevo favorito.
   * @param favorite Objeto que contiene la información del favorito a agregar.
   * @returns Un Observable que emite el favorito agregado.
   */
  addFav(favorite: { idUsuario: number | string, idElemento: number | string, tipoElemento: string }) {
    return this.httpClient.post<Favorite>(`${URL_BASE_BACKEND}/${ENDPOINT}`, favorite);
  }

  /**
   * Método para eliminar un favorito.
   * @param idUsuario El ID del usuario al que pertenece el favorito.
   * @param idElemento El ID del elemento que se desea eliminar de favoritos.
   * @returns Un Observable que emite la respuesta del servidor.
   */
  deleteFav(idUsuario: number | string, idElemento: number | string) {
    return this.httpClient.delete<any>(`${URL_BASE_BACKEND}/favs/del`, {
      params: {
        idUsuario: idUsuario.toString(),
        idElemento: idElemento.toString()
      }
    });
  }

  /**
   * Método para obtener los IDs de favoritos de un usuario.
   * @param idUsuario El ID del usuario.
   */
  async getUserFavoriteIds(idUsuario: number | string): Promise<void> {
    try {
      const RESPONSE = await this.getFavs(idUsuario).toPromise();
      if (RESPONSE) {
        // Reiniciar el array para evitar duplicados
        this.idsFavoritesDelUsuario = [];
        for (const favorite of RESPONSE) {
          this.idsFavoritesDelUsuario.push(favorite.idElemento.toString());
        }
        console.log('Lista de IDs de favoritos obtenida del servicio:', this.idsFavoritesDelUsuario);
      }
    } catch (error) {
      console.error('Error al obtener los favoritos del usuario: ', error);
    }
  }
}
