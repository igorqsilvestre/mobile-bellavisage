import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioForm3PageRoutingModule } from './login-usuario-form3-routing.module';

import { LoginUsuarioForm3Page } from './login-usuario-form3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginUsuarioForm3PageRoutingModule,
  ],
  declarations: [LoginUsuarioForm3Page]
})
export class LoginUsuarioForm3PageModule {}
