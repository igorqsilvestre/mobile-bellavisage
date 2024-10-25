import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarTratamentoPage } from './visualizar-tratamento.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarTratamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarTratamentoPageRoutingModule {}
