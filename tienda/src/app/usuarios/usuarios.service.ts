import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  urlBase = "http://localhost:4000/usuarios/";

  constructor(private http: HttpClient) {
    console.log('llega al servicio');
   }

  getUsuarios(): Observable<any> {
    let url = this.urlBase;

    return this.http.get(url);
  }

  insertUsuario(usuario: Usuario): Observable<any> {
    let url = this.urlBase;
    return this.http.post(url, usuario, {responseType: 'json'})
      .pipe(
        catchError(e => {
          console.log(e); 
          return throwError(e);
        })
      );
  }

  //EDITAR
  findUsuarioById(id:string): Observable<any> {
    console.log(id);
    console.log('Entra por el id');
    let url = this.urlBase+id;
    return this.http.get(url);
  }

  editarUsuario(usuario: Usuario): Observable<any> {
    console.log('Entra por el editar');
    console.log(usuario);
    let url = this.urlBase+usuario._id;
    delete usuario._id;
    return this.http.put(url, usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    let url = this.urlBase + id;
    return this.http.delete(url);
  }
}
