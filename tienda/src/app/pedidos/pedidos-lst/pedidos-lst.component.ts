import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Pedido } from 'src/app/models/Pedido';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { PedidosService } from '../pedidos.service';
import { PedidosLstDataSource } from './pedidos-lst-datasource';

@Component({
  selector: 'app-pedidos-lst',
  templateUrl: './pedidos-lst.component.html',
  styleUrls: ['./pedidos-lst.component.css']
})
export class PedidosLstComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Pedido>;
  dataSource: PedidosLstDataSource;

  lista: Pedido[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'numeroPedido', 'fecha', 'cliente', 'direccion', 'precioTotal', 'botones'];

  constructor(private pedidosServicio: PedidosService, private _snackBarService: SnackBarService) {
    this.dataSource = new PedidosLstDataSource([]);
  }

  ngAfterViewInit(): void {
    this.recogidaDatos();
  }

  recogidaDatos() {
    this.pedidosServicio.getPedidos().subscribe(datos => {
      //Datos contiene todo el objeto Pedidos
      console.log(datos);
      this.lista = datos;
      this.listar(datos);
    });
  }

  listar(datos: Pedido[]) {
    this.dataSource = new PedidosLstDataSource(datos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  eliminar(id:string) {
    this.pedidosServicio.eliminarPedido(id).subscribe(data => {
      this._snackBarService.openSnackBar('pedido', 'borrado');
      this.recogidaDatos();
    });
  }
}
