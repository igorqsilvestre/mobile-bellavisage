import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUsuarioForm2Page } from './login-usuario-form2.page';

const routes: Routes = [
  {
    path: '',
    component: LoginUsuarioForm2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginUsuarioForm2PageRoutingModule {}
