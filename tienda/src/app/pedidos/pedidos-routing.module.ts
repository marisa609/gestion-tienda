import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosLstComponent } from './pedidos-lst/pedidos-lst.component';

const routes: Routes = [
  { path: "", component: PedidosLstComponent},
  { path: "new", component: PedidosFormComponent},
  { path: "edit/:id", component: PedidosFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
