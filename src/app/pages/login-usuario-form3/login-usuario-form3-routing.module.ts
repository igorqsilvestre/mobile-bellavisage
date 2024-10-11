import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUsuarioForm3Page } from './login-usuario-form3.page';

const routes: Routes = [
  {
    path: '',
    component: LoginUsuarioForm3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginUsuarioForm3PageRoutingModule {}
