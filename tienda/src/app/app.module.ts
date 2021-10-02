import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ShellModule } from './shell/shell.module';
import { CategoriasService } from './categorias/categorias.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { ProductosService } from './productos/productos.service';
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from './servicios/snack-bar.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';


import { MatCardModule } from '@angular/material/card';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AuthInterceptorService } from './seguridad/auth-interceptor-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShellModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    LoginModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      //indicamos que clase implementa este interceptor
      useClass: AuthInterceptorService,
      //se usa para que no sea singleton, es decir
      //nos permita tener una instancia por cada peticion
      multi:true
    },
  CategoriasService, UsuariosService, ProductosService, SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
