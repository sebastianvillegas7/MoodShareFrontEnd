import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavService } from 'src/app/services/fav.service';
import { DiscogsService } from '../../services/discogs.service';
import { TipoElemento } from 'src/app/shared/interfaces/favorite.interface';
import { Observable, forkJoin, map } from 'rxjs';

/**
 * Componente para mostrar la página de favoritos de un usuario.
 */
@Component({
  selector: 'users-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
})
export class FavoritePageComponent implements OnInit {
  public listadoArtists: any[] = [];
  public listadoReleases: any[] = [];
  public listadoMasters: any[] = [];
  public userName: string = '';

  idFavAndIdElemMap: { [key: string | number]: string | number } = {};
  arrayIdsArtist: (string | number)[] = [];
  arrayIdsReleases: (string | number)[] = [];
  arrayIdsMasters: (string | number)[] = [];

  /**
   * Constructor del componente.
   * @param route ActivatedRoute para obtener los parámetros de la ruta
   * @param favService Servicio para gestionar los favoritos
   * @param discogsService Servicio para interactuar con la API de Discogs
   * @param router Router para la navegación entre páginas
   * @param snackBar Servicio para mostrar mensajes emergentes
   */
  constructor(
    private route: ActivatedRoute,
    private favService: FavService,
    private discogsService: DiscogsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Al inicializar el componente se obtiene los IDs de los favoritos del usuario
   * y carga los detalles de los elementos favoritos.
   */
  ngOnInit(): void {
    this.vaciarListados();

    this.route.paramMap.subscribe(params => {
      const idUsuario = params.get('id');
      this.userName = history.state.userName || 'Usuario';

      if (idUsuario) {
        this.getIdsFavorites(idUsuario);
      } else {
        this.snackBar.open('No se encontró el ID de usuario.', 'Cerrar', { duration: 5000 });
      }
    });
  }

  /**
   * Obtiene los IDs de los favoritos del usuario.
   * @param idUsuario ID del usuario cuyos favoritos se van a obtener.
   */
  async getIdsFavorites(idUsuario: string) {
    try {
      const RESPONSE = await this.favService.getFavs(idUsuario).toPromise();

      if (RESPONSE && RESPONSE.length > 0) {
        for (const favorite of RESPONSE) {
          this.idFavAndIdElemMap[favorite.idFav!] = favorite.idElemento;

          switch (favorite.tipoElemento) {
            case TipoElemento.Artist:
              this.arrayIdsArtist.push(favorite.idElemento);
              break;
            case TipoElemento.Release:
              this.arrayIdsReleases.push(favorite.idElemento);
              break;
            case TipoElemento.Master:
              this.arrayIdsMasters.push(favorite.idElemento);
              break;
          }
        }
        this.obtenerFavorites();
      } else {
        this.snackBar.open('No hay favoritos para mostrar.', 'Cerrar', { duration: 5000 });
      }
    } catch (error) {
      console.error('Error al obtener los favoritos: ', error);
      this.snackBar.open('Error al obtener los favoritos.', 'Cerrar', { duration: 5000 });
    }
  }

  /**
   * Obtiene los detalles de los elementos favoritos.
   */
  async obtenerFavorites() {
    const OBSERVABLES_ARTISTS: Observable<any>[] = this.arrayIdsArtist.map(id =>
      this.discogsService.getInfoArtistById(id).pipe(map(data => ({ ...data, tipoElemento: TipoElemento.Artist })))
    );

    const OBSERVABLES_RELEASES: Observable<any>[] = this.arrayIdsReleases.map(id =>
      this.discogsService.getReleaseById(id).pipe(map(data => ({ ...data, tipoElemento: TipoElemento.Release })))
    );

    const OBSERVABLES_MASTERS: Observable<any>[] = this.arrayIdsMasters.map(id =>
      this.discogsService.getMasterById(id).pipe(map(data => ({ ...data, tipoElemento: TipoElemento.Master })))
    );

    forkJoin([...OBSERVABLES_ARTISTS, ...OBSERVABLES_RELEASES, ...OBSERVABLES_MASTERS]).subscribe({
      next: (favorites: any[]) => {
        this.listadoArtists = favorites.filter(item => item.tipoElemento == TipoElemento.Artist);
        this.listadoReleases = favorites.filter(item => item.tipoElemento == TipoElemento.Release);
        this.listadoMasters = favorites.filter(item => item.tipoElemento == TipoElemento.Master);
      },
      error: (error: any) => {
        console.error('Error obteniendo favoritos: ', error);
      },
    });
  }

  /**
   * Limpia los listados de favoritos.
   */
  vaciarListados(){
    this.listadoArtists = [];
    this.listadoReleases = [];
    this.listadoMasters = [];
    this.arrayIdsArtist = [];
    this.arrayIdsReleases = [];
    this.arrayIdsMasters = [];
  }

  /**
   * Navega a la página de detalles del recurso seleccionado.
   * @param resourceUrl URL del recurso
   * @param type Tipo de recurso (artista, lanzamiento, maestro)
   */
  verDetalle(resourceUrl: string, type: string) {
    this.router.navigate(['/moodshare/detail'], { state: { resourceUrl, type } });
  }
}
