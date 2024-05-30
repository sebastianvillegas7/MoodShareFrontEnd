import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DiscogsService } from '../../../services/discogs.service';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

export class ListPageComponent {
  @Input()
  public listado: any[] = [];

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {

  }

  updateListado(listado: any[]) {
    this.listado = listado;
  }

  getImageUrl(item: any): string {
    // Si tiene `cover_image`, usarlo a menos que sea el placeholder
    if (item.cover_image && !item.cover_image.endsWith('spacer.gif')) {
      return item.cover_image;
    } else if (item.cover_image && item.cover_image.endsWith('spacer.gif')) {
      return '/assets/img/default-image.png';
    } else {
      // Si no hay `cover_image`, usar la primera URI de la lista de imágenes
      return item.images? (item.images[0].uri? item.images[1].uri : item.images[0].uri) : '/assets/img/default-image.png';
    }
  }


  verDetalle(idElemento:string, resourceUrl: string, tipoElemento: string) {
    this.router.navigate(['/moodshare/detail'], { state: { idElemento, resourceUrl, tipoElemento } });
  }
}
