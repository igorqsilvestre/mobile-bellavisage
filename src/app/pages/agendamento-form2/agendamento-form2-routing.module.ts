import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoForm2Page } from './agendamento-form2.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoForm2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentoForm2PageRoutingModule {}
