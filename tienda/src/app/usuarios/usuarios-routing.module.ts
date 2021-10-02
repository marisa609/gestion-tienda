import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { UsuariosLstComponent } from './usuarios-lst/usuarios-lst.component';

const routes: Routes = [
  {path: "", component: UsuariosLstComponent},
  {path: "new", component: UsuariosFormComponent},
  {path: "edit/:id", component: UsuariosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
