import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUsuarioForm1Page } from './login-usuario-form1.page';

const routes: Routes = [
  {
    path: '',
    component: LoginUsuarioForm1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginUsuarioForm1PageRoutingModule {}
