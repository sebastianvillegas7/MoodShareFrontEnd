import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';
import { Movie } from '../../../shared/interfaces/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})

export class ListPageComponent {
  @Input()
  public listado: any[] = [];

  constructor( private router: Router ) { }

  ngOnInit(): void {

  }

  updateListado(listado: any[]) {
    this.listado = listado;
  }

  // verDetalle(id: number) {
  //   this.router.navigate(['/detail/', id]);
  // }
}
