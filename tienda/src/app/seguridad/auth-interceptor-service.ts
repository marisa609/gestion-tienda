import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private router:Router) { }
    //metodo que se ejecuta cada vez que se intercepta una petición
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = sessionStorage.getItem("token");
        if (token != null) {
            var valor_token = JSON.parse(token);
            var request = req.clone({
                setHeaders: {
                    //aqui usando templates de ES6
                    //authorization: `${valor_token.tokenType} ${valor_token.accessToken}`
                    //concatenando como toda la vida
                    authorization: `Bearer ${valor_token.token}`
                }
            });
            return next.handle(request);
        } else {
            //aqui no tendriamos token sesion, y por ello lo mandamos a la página de login
            this.router.navigate(['/login']);
            //entonces le decimos que siga sin el token, esto dara un error que deberemos capturar
            return next.handle(req);
        }
    }

}