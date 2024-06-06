import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

/**
 * Este componente muestra una lista de elementos (artists, track, album) y
 * proporciona funcionalidades como la navegación a detalles del elemento
 * y la obtención de URL de imágenes.
 */
export class ListPageComponent {
  @Input()
  public listado: any[] = []; // Lista de elementos a mostrar

  constructor(
    private router: Router,
  ) { }

  /**
   * Actualiza el listado de elementos.
   * @param listado Nuevo listado de elementos.
   */
  updateListado(listado: any[]) {
    this.listado = listado;
  }

  /**
   * Obtiene la URL de la imagen para un elemento.
   * @param item Elemento del cual se obtendrá la imagen.
   * @returns URL de la imagen del elemento.
   */
  getImageUrl(item: any): string {
    // Si tiene `cover_image`, usarlo a menos que sea el placeholder
    if (item.cover_image && !item.cover_image.endsWith('spacer.gif')) {
      return item.cover_image;
    } else if (item.cover_image && item.cover_image.endsWith('spacer.gif')) {
      return '/assets/img/default-image.png';
    } else {
      // Si no hay `cover_image`, usar la primera URI de la lista de imágenes
      return item.images ? (item.images[0].uri ? item.images[1].uri : item.images[0].uri) : '/assets/img/default-image.png';
    }
  }

  /**
   * Navega a la página de detalle de un elemento.
   * @param idElemento ID del elemento.
   * @param resourceUrl URL del recurso asociado al elemento.
   * @param tipoElemento Tipo de elemento.
   */
  verDetalle(idElemento: string, resourceUrl: string, tipoElemento: string) {
    this.router.navigate(['/moodshare/detail'], { state: { idElemento, resourceUrl, tipoElemento } });
  }
}
