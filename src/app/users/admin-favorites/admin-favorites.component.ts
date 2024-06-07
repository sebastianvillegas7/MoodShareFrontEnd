import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavService } from 'src/app/services/fav.service';
import { Favorite } from 'src/app/shared/interfaces/favorite.interface';

@Component({
  selector: 'app-admin-favorites',
  templateUrl: './admin-favorites.component.html',
  styleUrls: ['./admin-favorites.component.css']
})
export class AdminFavoritesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idFav', 'idUsuario', 'idElemento', 'tipoElemento', 'acciones'];
  dataSource: MatTableDataSource<Favorite> = new MatTableDataSource();
  filterIdUsuario: string = '';
  filterTipoElemento: string = '';
  uniqueUsuarios: string[] = [];
  uniqueTipos: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private favService: FavService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilterPredicate;
  }

  loadFavorites(): void {
    this.favService.getAllFavs().subscribe({
      next: (favorites: Favorite[]) => {
        this.dataSource.data = favorites;
        this.uniqueUsuarios = [...new Set(favorites.map(fav => fav.idUsuario.toString()))];
        this.uniqueTipos = [...new Set(favorites.map(fav => fav.tipoElemento))];

        // Reasignar el paginador después de actualizar los datos
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        this.snackBar.open('Error al cargar los favoritos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = JSON.stringify({ idUsuario: this.filterIdUsuario, tipoElemento: this.filterTipoElemento });
  }

  customFilterPredicate(data: Favorite, filter: string): boolean {
    const filterObj = JSON.parse(filter);
    const matchesIdUsuario = !filterObj.idUsuario || data.idUsuario.toString() === filterObj.idUsuario;
    const matchesTipoElemento = !filterObj.tipoElemento || data.tipoElemento === filterObj.tipoElemento;
    return matchesIdUsuario && matchesTipoElemento;
  }

  deleteFavorite(idUsuario: string | number, idElemento: string | number): void {
    this.favService.deleteFav(idUsuario, idElemento).subscribe({
      next: () => {
        this.snackBar.open('Favorito eliminado correctamente', 'Cerrar', { duration: 3000 });
        this.loadFavorites();
      },
      error: () => {
        this.snackBar.open('Error al eliminar el favorito', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
