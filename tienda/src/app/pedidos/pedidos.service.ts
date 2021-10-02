import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  urlBase = "http://localhost:4000/pedidos/";

  constructor(private http: HttpClient) { }


  //MOSTRAR
  getPedidos(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  
  }

  //ISNERTAR
  insertPedido(pedido: Pedido ): Observable<any> {
    let url = this.urlBase;
    return this.http.post(url, pedido, {responseType: 'json'}).pipe(
      catchError(e => {
        console.log(e); 
        return throwError(e);
      })
    );
  }

  //EDITAR
  findPedidoById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }

  editarPedido(pedido: Pedido ): Observable<any> {
    console.log(pedido);
    let url = this.urlBase+pedido._id;
    delete pedido._id;
    return this.http.put(url, pedido);
  }

  //ELIMINAR
  eliminarPedido(id: string): Observable<any> {
    let url = this.urlBase + id;
    return this.http.delete(url);
  }
}
