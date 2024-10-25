import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarTratamentoPageRoutingModule } from './visualizar-tratamento-routing.module';

import { VisualizarTratamentoPage } from './visualizar-tratamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarTratamentoPageRoutingModule
  ],
  declarations: [VisualizarTratamentoPage]
})
export class VisualizarTratamentoPageModule {}
