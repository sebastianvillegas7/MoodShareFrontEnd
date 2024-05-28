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
    if (item.cover_image && item.cover_image !== 'https://st.discogs.com/54eda74ad6e53ba8349acc64015edcc4f17c6796/images/spacer.gif') {
      return item.cover_image;
    } else if (item.cover_image && item.cover_image !== 'https://st.discogs.com/54eda74ad6e53ba8349acc64015edcc4f17c6796/images/spacer.gif') {
      return '/assets/img/default-image.png';
    } else {
      return item.images[0].uri;
    }
  }

  verDetalle(resourceUrl: string, type: string) {
    this.router.navigate(['/moodshare/detail'], { state: { resourceUrl, type } });
  }
}
