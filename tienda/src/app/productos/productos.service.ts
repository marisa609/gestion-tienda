import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlBase = "http://localhost:4000/productos/";

  constructor(private http: HttpClient) { }


  //MOSTRAR
  getProductos(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  
  }

  //ISNERTAR
  insertProducto(producto: Producto): Observable<any> {
    let url = this.urlBase;
    return this.http.post(url, producto, {responseType: 'json'}).pipe(
      catchError(e => {
        console.log(e); 
        return throwError(e);
      })
    );
  }

  //EDITAR
  findProductoById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }

  editarProducto(producto: Producto): Observable<any> {
    let url = this.urlBase+producto._id;
    delete producto._id;
    return this.http.put(url, producto);
  }

  //ELIMINAR
  eliminarProducto(id: string): Observable<any> {
    let url = this.urlBase + id;
    return this.http.delete(url);
  }
}
