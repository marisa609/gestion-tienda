import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from './seguridad/auth-guard.guard';

const routes: Routes = [
  {
    path:"", 
    component: HomeComponent, canActivate: [AuthGuardGuard], 
    pathMatch: "full"
  },
  {
    path: "login", 
    loadChildren: () => import('./login/login-routing.module').then(m => m.LoginRoutingModule)
  },
  {
    path: "categorias", 
    loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule)
  },
  {
    path: "productos", 
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path: "usuarios", 
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: "pedidos", 
    loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule)
  },
  {path:"home", component: HomeComponent, canActivate: [AuthGuardGuard]}

];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
