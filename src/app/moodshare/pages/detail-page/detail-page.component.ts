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

  async ngOnInit(): Promise<void> {
    this.idElemento = history.state.idElemento;
    this.resourceUrl = history.state.resourceUrl;
    this.tipoElemento = history.state.tipoElemento;
    this.idUsuario = localStorage.getItem('id_usuario')!;

    // Obtener los IDs de favoritos del usuario y esperar a que se completen
    await this.favService.getUserFavoriteIds(this.idUsuario);

    // Imprimir los favoritos obtenidos
    console.log('IDs de favoritos del usuario:', this.favService.idsFavoritesDelUsuario);
    console.log('ID del elemento actual:', this.idElemento);

    // Comprobar si el elemento es favorito
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

  comprobarSiEsFavorita(): void {
    console.log('Verificando si el elemento es favorito:', this.idElemento);
    console.log('Tipo de idElemento:', typeof this.idElemento);
    this.esFavorita = this.favService.idsFavoritesDelUsuario.includes(this.idElemento.toString());
    console.log('Resultado de la verificación (esFavorita):', this.esFavorita);
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

      // Actualizar la lista de favoritos del usuario
      await this.favService.getUserFavoriteIds(this.idUsuario);

      // Comprobar si es favorita después de agregar
      this.comprobarSiEsFavorita();

      // Actualizar el estado del componente
      this.esFavorita = true;
      console.log('Elemento agregado a favoritos, nuevo estado (esFavorita):', this.esFavorita);
    } catch (error) {
      console.error('Error agregando a favorita: ', error);
      this.snackBar.open('Error agregando a favoritos', 'Cerrar', { duration: 5000 });
    }
  }

  async quitarFavorita(): Promise<void> {
    try {
      if (this.favService.idsFavoritesDelUsuario.includes(this.idElemento.toString())) {
        await this.favService.deleteFav(this.idUsuario, this.idElemento).toPromise();
        this.snackBar.open('Quitado de favoritos', 'Cerrar', { duration: 5000 });

        await this.favService.getUserFavoriteIds(this.idUsuario);

        this.comprobarSiEsFavorita();
        this.esFavorita = false;
        console.log('Elemento quitado de favoritos, nuevo estado (esFavorita):', this.esFavorita);
      }
    } catch (error) {
      console.error('Error quitando de favorita: ', error);
      this.snackBar.open('Error quitando de favoritos', 'Cerrar', { duration: 5000 });
    }
  }


  goBack(): void {
    this.router.navigate(['/moodshare/home']);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DiscogsService } from 'src/app/services/discogs.service';
// import { FavService } from 'src/app/services/fav.service';
// import { Favorite } from 'src/app/shared/interfaces/favorite.interface';

// @Component({
//   selector: 'moodshare-detail-page',
//   templateUrl: './detail-page.component.html',
//   styleUrls: ['./detail-page.component.css'],
// })
// export class DetailPageComponent implements OnInit {
//   esFavorita: boolean = false;

//   resourceUrl: string = "";
//   tipoElemento: string = "";
//   resourceData: any;

//   idElemento: string = "";
//   idUsuario: string | number = "";

//   constructor(
//     private router: Router,
//     public discogsService: DiscogsService,
//     private favService: FavService,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     this.idElemento = history.state.idElemento;
//     this.resourceUrl = history.state.resourceUrl;
//     this.tipoElemento = history.state.tipoElemento;
//     this.idUsuario = localStorage.getItem('id_usuario')!;


//     // Obtener los IDs de favoritos del usuario
//     this.favService.getUserFavoriteIds(localStorage.getItem('id_usuario')!);
//     this.comprobarSiEsFavorita(this.idElemento);

//     this.discogsService.getResourceDataByUrl(this.resourceUrl).subscribe(
//       (respuesta) => {
//         if (!respuesta) {
//           console.error('No se obtuvieron datos del recurso');
//           this.snackBar.open('No se obtuvieron datos del recurso', 'Cerrar', { duration: 5000 });
//           this.router.navigate(['/home']);
//           return;
//         } else {
//           this.comprobarSiEsFavorita(this.idElemento);
//           this.resourceData = respuesta;

//           if (this.tipoElemento == 'artist') {
//             this.getReleases(this.idElemento);
//           }
//         }
//       },
//       (error) => {
//         console.error('Error obteniendo datos del recurso: ', error);
//         this.snackBar.open('Error obteniendo datos del recurso', 'Cerrar', { duration: 5000 });
//         this.router.navigate(['/home']);
//       }
//     );
//   }

//   getReleases(artistId: number | string): void {
//     this.discogsService.getArtistReleases(artistId).subscribe(
//       (data) => {
//         this.discogsService.listadoReleases = data.releases;
//       },
//       (error) => {
//         console.error('Error obteniendo lanzamientos del artista: ', error);
//         this.snackBar.open('Error obteniendo lanzamientos del artista', 'Cerrar', { duration: 5000 });
//       }
//     );
//   }

//   comprobarSiEsFavorita(idElemento: string | number): void {
//     this.esFavorita = this.favService.idsFavoritesDelUsuario.includes(idElemento);
//   }

//   // Lógica para agregar o quitar la película de la lista de favoritos según su estado
//   toggleFav(): void {
//     if (this.esFavorita) {
//       this.quitarFavorita();
//     } else {
//       this.agregarFavorita();
//     }
//   }

//   async agregarFavorita(): Promise<void> {
//     const NEW_FAVORITE: Favorite = {
//       idUsuario: this.idUsuario,
//       idElemento: this.idElemento,
//       tipoElemento: this.tipoElemento
//     };

//     try {
//       await this.favService.addFav(NEW_FAVORITE).toPromise();
//       this.snackBar.open('Agregado a favoritos', 'Cerrar', { duration: 5000 });

//       // Actualizar la lista de favoritos del usuario
//       await this.favService.getUserFavoriteIds(this.idUsuario);

//       // Comprobar si es favorita después de agregar
//       this.comprobarSiEsFavorita(this.idElemento);

//       // Actualizar el estado del componente
//       this.esFavorita = true;
//     } catch (error) {
//       console.error('Error agregando a favorita: ', error);
//       this.snackBar.open('Error agregando a favoritos', 'Cerrar', { duration: 5000 });
//     }
//   }


//   async quitarFavorita(): Promise<void> {
//     try {
//       // Verificar si el ID del elemento está en los favoritos del usuario
//       if (this.favService.idsFavoritesDelUsuario.includes(this.idElemento)) {
//         await this.favService.deleteFav(this.idElemento).toPromise();
//         this.snackBar.open('Quitado de favoritos', 'Cerrar', { duration: 5000 });
//         this.esFavorita = false; // Actualizar a false después de quitar
//         // Actualizar la lista de favoritos del usuario
//         await this.favService.getUserFavoriteIds(this.idUsuario);
//         // Comprobar si es favorita después de quitar
//         this.comprobarSiEsFavorita(this.idElemento);
//       }
//     } catch (error) {
//       console.error('Error quitando de favorita: ', error);
//       this.snackBar.open('Error quitando de favoritos', 'Cerrar', { duration: 5000 });
//     }
//   }

//   goBack(): void {
//     this.router.navigate(['/moodshare/home'])
//   }
// }

