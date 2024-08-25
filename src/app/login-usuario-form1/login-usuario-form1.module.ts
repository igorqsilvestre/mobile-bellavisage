import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioForm1PageRoutingModule } from './login-usuario-form1-routing.module';

import { LoginUsuarioForm1Page } from './login-usuario-form1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUsuarioForm1PageRoutingModule
  ],
  declarations: [LoginUsuarioForm1Page]
})
export class LoginUsuarioForm1PageModule {}
