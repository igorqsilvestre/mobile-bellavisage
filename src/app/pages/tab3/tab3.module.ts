import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { TelefoneMaskDirective } from 'src/app/directives/telefone-mask.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    TelefoneMaskDirective
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
