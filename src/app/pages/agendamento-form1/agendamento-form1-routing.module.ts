import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoForm1Page } from './agendamento-form1.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoForm1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentoForm1PageRoutingModule {}
