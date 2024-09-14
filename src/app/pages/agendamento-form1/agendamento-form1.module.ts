import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoForm1PageRoutingModule } from './agendamento-form1-routing.module';

import { AgendamentoForm1Page } from './agendamento-form1.page';
import { TabsPageModule } from '../tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamentoForm1PageRoutingModule,
  ],
  declarations: [AgendamentoForm1Page]
})
export class AgendamentoForm1PageModule {}
