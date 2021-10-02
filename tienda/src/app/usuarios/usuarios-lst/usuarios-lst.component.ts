import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Usuario } from 'src/app/models/Usuario';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { UsuariosService } from '../usuarios.service';
import { UsuariosLstDataSource } from './usuarios-lst-datasource';

@Component({
  selector: 'app-usuarios-lst',
  templateUrl: './usuarios-lst.component.html',
  styleUrls: ['./usuarios-lst.component.css']
})
export class UsuariosLstComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Usuario>;
  dataSource: UsuariosLstDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'apellido','dni', 'email', 'username', 'tipoUsuario', 'direcciones', 'botones'];

  lstUsuario:Usuario[]=[];

  constructor(private usuariosServicio: UsuariosService, private _snackBarService: SnackBarService) {
    this.dataSource = new UsuariosLstDataSource([]);
  }

  ngAfterViewInit(): void {
    this.recogidaDatos();
  }

  recogidaDatos() {
    this.usuariosServicio.getUsuarios().subscribe(datos => {
      console.log(datos);
      this.lstUsuario = datos;
      this.listar(datos);
    });
  }

  listar(datos: Usuario[]) {
    this.dataSource = new UsuariosLstDataSource(datos);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  eliminar(id:string) {
    this.usuariosServicio.eliminarUsuario(id).subscribe(data => {
      this._snackBarService.openSnackBar('usuario', 'borrado');
      this.recogidaDatos();
    });
  }
}
