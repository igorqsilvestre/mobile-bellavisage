import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTratamentosPageRoutingModule } from './lista-tratamentos-routing.module';

import { ListaTratamentosPage } from './lista-tratamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTratamentosPageRoutingModule
  ],
  declarations: [ListaTratamentosPage]
})
export class ListaTratamentosPageModule {}
