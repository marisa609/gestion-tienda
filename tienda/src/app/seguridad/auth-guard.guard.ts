import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router:Router) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let token = sessionStorage.getItem("token");
      if(token!=null) {
        console.log('entra true');
        //Pasamos el token a JSON
        var tokerParseado = JSON.parse(token);
        console.log(tokerParseado.payload.tipoUsuario);

        //Si el tipo usuario es administrador lo guardamos en el sesión
        if(tokerParseado.payload.tipoUsuario == "Administrador") {
          sessionStorage.setItem("tipoUsuario", "Administrador");
        }
        return true;
      }
      console.log('entra');
      return this.router.navigate(["/pedidos"]);
  }
  
}
