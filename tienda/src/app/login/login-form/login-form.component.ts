import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  fotoFondo:string = "assets/fondo4.jpg";
  fotoHiberusLogin:string = "assets/hiberusLogin.jpg";

  loginForm = this.fb.group({
    username: [null, Validators.required],
    clave: [null, Validators.required],
  });

  private urlAPI= "http://localhost:4000/login";



  constructor(private router:Router, private fb: FormBuilder, private httpClient: HttpClient) { 
    
  }
  

  ngOnInit(): void {
    
  }
  

  onSubmit(): void {
    this.httpClient
    .post<any>(this.urlAPI, {
      username:this.loginForm.value.username,
      clave:this.loginForm.value.clave
    })
    .subscribe(
      token => {
        sessionStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(["/home"]);
      },
     error => this.onError(error));
  }

  //Gestión de errores 
  private onError(err: any) {
    console.log('Entra por el error');
    console.log(err);
    const ERROR_NOT_PERMITS = 403;

    if (err instanceof HttpErrorResponse) {
      if (err.status == ERROR_NOT_PERMITS) {
        alert("El usuario no tiene permisos");
      }
    }

  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }



}
