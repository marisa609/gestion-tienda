import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Producto } from 'src/app/models/Producto';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ProductosService } from '../productos.service';
import { ProductosLstDataSource } from './productos-lst-datasource';

@Component({
  selector: 'app-productos-lst',
  templateUrl: './productos-lst.component.html',
  styleUrls: ['./productos-lst.component.css']
})
export class ProductosLstComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Producto>;
  dataSource: ProductosLstDataSource;

  //Datos que vamos a mostrar en la lista
  lista: Producto[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'referencia', 'titulo', 'descripcion','categoriaID', 'precio', 'botones'];

  constructor(private productosService: ProductosService, private _snackBarService: SnackBarService) {
    this.dataSource = new ProductosLstDataSource([]);
  }

  ngAfterViewInit(): void {
    this.recogidaDatos();
  }

  recogidaDatos() {
    this.productosService.getProductos().subscribe(datos => {
      console.log(datos);
      this.lista = datos;
      this.listar(datos);
    });
  }

  listar(datos: Producto[]) {
    this.dataSource = new ProductosLstDataSource(datos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  eliminar(id:string) {
    this.productosService.eliminarProducto(id).subscribe(data => {
      this._snackBarService.openSnackBar('producto', 'borrado');
      this.recogidaDatos();
    });
  }
}
