import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  urlBase = "http://localhost:4000/categorias/";

  constructor(private http: HttpClient) { }


  //MOSTRAR
  getCategorias(): Observable<any> {
    let url = this.urlBase;
    return this.http.get(url);
  
  }

  //ISNERTAR
  insertCategoria(categoria: Categoria): Observable<any> {
    let url = this.urlBase;
    return this.http.post(url, categoria, {responseType: 'json'}).pipe(
      catchError(e => {
        console.log(e); 
        return throwError(e);
      })
    );
  }

  //EDITAR
  findCategoriaById(id:string): Observable<any> {
    let url = this.urlBase+id;
    return this.http.get(url);
  }

  editarCategoria(categoria: Categoria): Observable<any> {
    let url = this.urlBase+categoria._id;
    delete categoria._id;
    return this.http.put(url, categoria);
  }

  //ELIMINAR
  eliminarCategoria(id: string): Observable<any> {
    let url = this.urlBase + id;
    return this.http.delete(url);
  }


}
