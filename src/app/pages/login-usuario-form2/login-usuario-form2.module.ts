import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioForm2PageRoutingModule } from './login-usuario-form2-routing.module';

import { LoginUsuarioForm2Page } from './login-usuario-form2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUsuarioForm2PageRoutingModule
  ],
  declarations: [LoginUsuarioForm2Page]
})
export class LoginUsuarioForm2PageModule {}
