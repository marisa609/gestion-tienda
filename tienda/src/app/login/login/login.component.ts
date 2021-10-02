import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private urlAPI= "http://51.38.51.187:5050/api/v1/auth/log-in";
  /* fotoLogin:string = "assets/fondo3.webp"; */
  fotoFondo:string = "assets/fondo4.jpg";
  fotoHiberusLogin:string = "assets/hiberusLogin.jpg";
  
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.httpClient
    .post<any>(this.urlAPI, {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    })
    .subscribe(
      token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(["/usuarios"]);
      },
      error => this.onError(error));
  }


  //Gestión de errores 
  private onError(err: any) {
    const ERROR_NOT_FOUND = 404;
    const ERROR_USER_NOT_VALIDATE = 601;

    if (err instanceof HttpErrorResponse) {
      if (err.status == ERROR_NOT_FOUND) {
        alert("User email not found or password invalid");
      } else if (err.status == ERROR_USER_NOT_VALIDATE) {
        alert("User email not found or password invalid");
      } else {
        alert("unknown error");
      }
    }

  }

  //Si el usuario pulsa registrarse, llevará a la pantalla de registro
  public registrarse() {
    this.router.navigate(["login/registro"])
  }
}
