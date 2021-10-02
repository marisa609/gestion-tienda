import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosLstComponent } from './productos-lst/productos-lst.component';

const routes: Routes = [
  {path: "", component: ProductosLstComponent},
  {path: "new", component: ProductosFormComponent},
  {path: "edit/:id", component: ProductosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
