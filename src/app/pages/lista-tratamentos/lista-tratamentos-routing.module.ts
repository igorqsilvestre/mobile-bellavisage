import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTratamentosPage } from './lista-tratamentos.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTratamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTratamentosPageRoutingModule {}
