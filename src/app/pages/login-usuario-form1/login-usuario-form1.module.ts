import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioForm1PageRoutingModule } from './login-usuario-form1-routing.module';

import { LoginUsuarioForm1Page } from './login-usuario-form1.page';
import { CpfMaskDirective } from 'src/app/directives/cpf-mask.directive';
import { TelefoneMaskDirective } from 'src/app/directives/telefone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUsuarioForm1PageRoutingModule,
    CpfMaskDirective,
    TelefoneMaskDirective
  ],
  declarations: [LoginUsuarioForm1Page]
})
export class LoginUsuarioForm1PageModule {}
