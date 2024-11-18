import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login/novo-usuario-parte1',
    loadChildren: () => import('./pages/login-usuario-form1/login-usuario-form1.module').then( m => m.LoginUsuarioForm1PageModule)
  },
  {
    path: 'login/novo-usuario-parte2',
    loadChildren: () => import('./pages/login-usuario-form2/login-usuario-form2.module').then( m => m.LoginUsuarioForm2PageModule)
  },
  {
    path: 'login/novo-usuario-parte3',
    loadChildren: () => import('./pages/login-usuario-form3/login-usuario-form3.module').then( m => m.LoginUsuarioForm3PageModule)
  },
  {
    path: 'login/alterar-senha',
    loadChildren: () => import('./pages/login-alterar-senha/login-alterar-senha.module').then( m => m.LoginAlterarSenhaPageModule)
  },






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
