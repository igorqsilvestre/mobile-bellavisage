import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-novo-usuario-parte1',
    loadChildren: () => import('./login-usuario-form1/login-usuario-form1.module').then( m => m.LoginUsuarioForm1PageModule)
  },
  {
    path: 'login-novo-usuario-parte2',
    loadChildren: () => import('./login-usuario-form2/login-usuario-form2.module').then( m => m.LoginUsuarioForm2PageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
