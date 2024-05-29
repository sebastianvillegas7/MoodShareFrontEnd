import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscogsService } from 'src/app/services/discogs.service';
import { FavService } from 'src/app/services/fav.service';
import { Favorite } from 'src/app/shared/interfaces/favorite.interface';

@Component({
  selector: 'moodshare-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  esFavorita: boolean = false;

  resourceUrl: string = "";
  tipoElemento: string = "";
  resourceData: any;

  idElemento: string = "";
  idUsuario: string | number = "";

  constructor(
    private router: Router,
    public discogsService: DiscogsService,
    private favService: FavService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.idElemento = history.state.idElemento;
    this.resourceUrl = history.state.resourceUrl;
    this.tipoElemento = history.state.tipoElemento;
    this.idUsuario = localStorage.getItem('id_usuario')!;

    this.discogsService.getResourceDataByUrl(this.resourceUrl).subscribe(
      (respuesta) => {
        if (!respuesta) {
          console.error('No se obtuvieron datos del recurso');
          this.snackBar.open('No se obtuvieron datos del recurso', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/home']);
          return;
        } else {
          this.comprobarSiEsFavorita(this.idElemento);
          this.resourceData = respuesta;

          if (this.tipoElemento == 'artist') {
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

  comprobarSiEsFavorita(idElemento: string | number): void {
    this.favService.getFavs(this.idUsuario).subscribe(
      (respuesta) => {
        if (respuesta) {
          this.esFavorita = respuesta.some(
            (fav: any) => fav.idElemento == idElemento
          );
        }
      },
      (error) => {
        console.error('Error comprobando si es favorita: ', error);
      }
    );
  }


  // Lógica para agregar o quitar la película de la lista de favoritos según su estado
  toggleFav(): void {
    if (this.esFavorita) {
      this.quitarFavorita();
    } else {
      this.agregarFavorita();
    }
  }

  async agregarFavorita(): Promise<void> {
    const NEW_FAVORITE: Favorite = {
      idUsuario: this.idUsuario,
      idElemento: this.idElemento,
      tipoElemento: this.tipoElemento
    };

    try {
      await this.favService.addFav(NEW_FAVORITE).toPromise();
      this.snackBar.open('Agregado a favoritos', 'Cerrar', { duration: 5000 });
      this.esFavorita = true;
    } catch (error) {
      console.error('Error agregando a favorita: ', error);
      this.snackBar.open('Error agregando a favoritos', 'Cerrar', { duration: 5000 });
    }
  }

  async quitarFavorita(): Promise<void> {
    try {
      const favs = await this.favService.getFavs(this.idUsuario).toPromise();
      if (favs != null) {
        const FAVORITE = favs.find((fav: any) => fav.idElemento == this.idElemento);

        if (FAVORITE) {
          await this.favService.deleteFav(FAVORITE.idFav!).toPromise();
          this.snackBar.open('Quitado de favoritos', 'Cerrar', { duration: 5000 });
          this.esFavorita = false;
        }
      }
    } catch (error) {
      console.error('Error quitando de favorita: ', error);
      this.snackBar.open('Error quitando de favoritos', 'Cerrar', { duration: 5000 });
    }
  }

  goBack(): void {
    this.router.navigate(['/moodshare/home'])
  }
}
