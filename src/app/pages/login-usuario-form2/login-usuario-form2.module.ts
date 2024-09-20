import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioForm2PageRoutingModule } from './login-usuario-form2-routing.module';

import { LoginUsuarioForm2Page } from './login-usuario-form2.page';
import { CpfMaskDirective } from 'src/app/directives/cpf-mask.directive';
import { TelefoneMaskDirective } from 'src/app/directives/telefone-mask.directive';
import { DataNascimentoMaskDirective } from 'src/app/directives/dataNascimento-mask.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUsuarioForm2PageRoutingModule,
    CpfMaskDirective,
    TelefoneMaskDirective,
    DataNascimentoMaskDirective
  ],
  declarations: [LoginUsuarioForm2Page]
})
export class LoginUsuarioForm2PageModule {}
