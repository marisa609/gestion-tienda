import { AfterViewInit, Component, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Categoria } from 'src/app/models/Categoria';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { CategoriasService } from '../categorias.service';
import { CategoriasLstDataSource } from './categorias-lst-datasource';

@Component({
  selector: 'app-categorias-lst',
  templateUrl: './categorias-lst.component.html',
  styleUrls: ['./categorias-lst.component.css']
})
export class CategoriasLstComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Categoria>;
  dataSource: CategoriasLstDataSource;
  //Datos que vamos a mostrar en la lista
  lista: Categoria[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'botones'];

  constructor(private categoriasServicio: CategoriasService, private _snackBarService: SnackBarService) {
    this.dataSource = new CategoriasLstDataSource([]);
  }

  ngAfterViewInit(): void {
    this.recogidaDatos();
  }

  recogidaDatos() {
    this.categoriasServicio.getCategorias().subscribe(datos => {
      console.log(datos);
      this.lista = datos;
      this.listar(datos);
    });
  }

  listar(datos: Categoria[]) {
    this.dataSource = new CategoriasLstDataSource(datos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  //ACtualizamos la tabla cuando detectamos cambios
  ngOnChanges(cambios: SimpleChanges) {
    this.lista = cambios.listaUsuarios.currentValue
    this.dataSource = new CategoriasLstDataSource(this.lista);
    //Si la tabla no existe la creamos
    if (typeof (this.table) != "undefined") {
      this.dataSource = new CategoriasLstDataSource(this.lista);
      this.recogidaDatos();
    }
  }

  eliminar(id:string) {
    this.categoriasServicio.eliminarCategoria(id).subscribe(data => {
      this._snackBarService.openSnackBar('categoría', 'borrada');
      this.recogidaDatos();
    });
  }
}
