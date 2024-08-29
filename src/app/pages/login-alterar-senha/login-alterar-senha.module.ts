import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAlterarSenhaPageRoutingModule } from './login-alterar-senha-routing.module';

import { LoginAlterarSenhaPage } from './login-alterar-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginAlterarSenhaPageRoutingModule
  ],
  declarations: [LoginAlterarSenhaPage]
})
export class LoginAlterarSenhaPageModule {}
