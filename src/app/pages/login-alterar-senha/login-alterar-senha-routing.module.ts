import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAlterarSenhaPage } from './login-alterar-senha.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAlterarSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAlterarSenhaPageRoutingModule {}
