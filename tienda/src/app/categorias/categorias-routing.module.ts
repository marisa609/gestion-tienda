import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { CategoriasLstComponent } from './categorias-lst/categorias-lst.component';

const routes: Routes = [
  {path: "", component: CategoriasLstComponent},
  {path: "new", component: CategoriasFormComponent},
  {path: "edit/:id", component: CategoriasFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
