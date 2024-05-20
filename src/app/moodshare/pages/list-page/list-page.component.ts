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

  constructor( private router: Router,
               private discogsService: DiscogsService,
   ) { }

  ngOnInit(): void {

  }

  updateListado(listado: any[]) {
    this.listado = listado;
  }

  verDetalle(resourceUrl: string) {
    this.router.navigate(['/detail'], { state: { resourceUrl } });
  }
}
