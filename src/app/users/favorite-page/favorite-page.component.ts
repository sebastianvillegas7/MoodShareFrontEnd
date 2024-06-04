import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavService } from 'src/app/services/fav.service';
import { DiscogsService } from '../../services/discogs.service';
import { TipoElemento } from 'src/app/shared/interfaces/favorite.interface';
import { Observable, forkJoin, map } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private favService: FavService,
    private discogsService: DiscogsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

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

  vaciarListados(){
    this.listadoArtists = [];
    this.listadoReleases = [];
    this.listadoMasters = [];
    this.arrayIdsArtist = [];
    this.arrayIdsReleases = [];
    this.arrayIdsMasters = [];
  }

  verDetalle(resourceUrl: string, type: string) {
    this.router.navigate(['/moodshare/detail'], { state: { resourceUrl, type } });
  }
}
