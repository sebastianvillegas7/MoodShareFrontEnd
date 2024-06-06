import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DiscogsService } from 'src/app/services/discogs.service';
import { FavService } from 'src/app/services/fav.service';
import { Favorite } from 'src/app/shared/interfaces/favorite.interface';

@Component({
  selector: 'moodshare-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
/**
 * Este componente muestra los detalles de un elemento específico y
 * permite al usuario agregarlo o quitarlo de sus favoritos.
 */
export class DetailPageComponent implements OnInit {
  esFavorita: boolean = false;
  resourceUrl: string = ""; // URL del recurso a obtener
  tipoElemento: string = "";
  resourceData: any; // Datos del recurso obtenido

  idElemento: string = "";
  idUsuario: string | number = "";

  constructor(
    private router: Router,
    public discogsService: DiscogsService,
    private favService: FavService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Obtiene los detalles del recurso y comprueba si es favorito.
   */
  async ngOnInit(): Promise<void> {
    this.idElemento = history.state.idElemento;
    this.resourceUrl = history.state.resourceUrl;
    this.tipoElemento = history.state.tipoElemento;
    this.idUsuario = localStorage.getItem('id_usuario')!;

    // Obtener los IDs de favoritos del usuario y esperar a que se completen
    await this.favService.getUserFavoriteIds(this.idUsuario);

    this.comprobarSiEsFavorita();

    this.discogsService.getResourceDataByUrl(this.resourceUrl).subscribe(
      (respuesta) => {
        if (!respuesta) {
          console.error('No se obtuvieron datos del recurso');
          this.snackBar.open('No se obtuvieron datos del recurso', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/home']);
          return;
        } else {
          this.resourceData = respuesta;

          if (this.tipoElemento === 'artist') {
            this.getReleases(this.idElemento);
          }
        }
      },
      (error) => {
        console.error('Error obteniendo datos del recurso: ', error);
        this.snackBar.open('Error obteniendo datos del recurso', 'Cerrar', { duration: 5000 });
        this.router.navigate(['/home']);
      }
    );
  }

  /**
   * Obtiene los lanzamientos del artista.
   * @param artistId ID del artista.
   */
  getReleases(artistId: number | string): void {
    this.discogsService.getArtistReleases(artistId).subscribe(
      (data) => {
        this.discogsService.listadoReleases = data.releases;
      },
      (error) => {
        console.error('Error obteniendo lanzamientos del artista: ', error);
        this.snackBar.open('Error obteniendo lanzamientos del artista', 'Cerrar', { duration: 5000 });
      }
    );
  }

  /**
   * Comprueba si el elemento es favorito.
   */
  comprobarSiEsFavorita(): void {
    this.esFavorita = this.favService.idsFavoritesDelUsuario.includes(this.idElemento.toString());
  }

  /**
   * Alternar el estado de favorito del elemento.
   */
  toggleFav(): void {
    if (this.esFavorita) {
      this.quitarFavorita();
    } else {
      this.agregarFavorita();
    }
  }

  /**
   * Agregar el elemento a favoritos.
   */
  async agregarFavorita(): Promise<void> {
    const NEW_FAVORITE: Favorite = {
      idUsuario: this.idUsuario,
      idElemento: this.idElemento,
      tipoElemento: this.tipoElemento
    };

    try {
      await this.favService.addFav(NEW_FAVORITE).toPromise();
      this.snackBar.open('Agregado a favoritos', 'Cerrar', { duration: 5000 });

      // Actualizar la lista de favoritos del usuario
      await this.favService.getUserFavoriteIds(this.idUsuario);

      // Comprobar si es favorita después de agregar
      this.comprobarSiEsFavorita();

      // Actualizar el estado del componente
      this.esFavorita = true;
    } catch (error) {
      console.error('Error agregando a favorita: ', error);
      this.snackBar.open('Error agregando a favoritos', 'Cerrar', { duration: 5000 });
    }
  }

  /**
   * Quitar el elemento de favoritos.
   */
  async quitarFavorita(): Promise<void> {
    try {
      if (this.favService.idsFavoritesDelUsuario.includes(this.idElemento.toString())) {
        await this.favService.deleteFav(this.idUsuario, this.idElemento).toPromise();
        this.snackBar.open('Quitado de favoritos', 'Cerrar', { duration: 5000 });

        await this.favService.getUserFavoriteIds(this.idUsuario);

        this.comprobarSiEsFavorita();
        this.esFavorita = false;
      }
    } catch (error) {
      console.error('Error quitando de favorita: ', error);
      this.snackBar.open('Error quitando de favoritos', 'Cerrar', { duration: 5000 });
    }
  }

  /**
   * Navegar a la página de inicio.
   */
  goBack(): void {
    this.router.navigate(['/moodshare/home']);
  }
}
