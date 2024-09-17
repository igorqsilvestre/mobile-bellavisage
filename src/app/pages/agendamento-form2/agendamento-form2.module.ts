import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoForm2PageRoutingModule } from './agendamento-form2-routing.module';

import { AgendamentoForm2Page } from './agendamento-form2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentoForm2PageRoutingModule
  ],
  declarations: [AgendamentoForm2Page]
})
export class AgendamentoForm2PageModule {}
