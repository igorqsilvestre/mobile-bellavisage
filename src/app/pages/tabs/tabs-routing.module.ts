import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'novo-agendamento-parte1',
        loadChildren: () => import('../agendamento-form1/agendamento-form1.module').then(m => m.AgendamentoForm1PageModule)
      },
      {
        path: 'novo-agendamento-parte2',
        loadChildren: () => import('../agendamento-form2/agendamento-form2.module').then(m => m.AgendamentoForm2PageModule)
      },
      {
        path: 'avaliacao',
        loadChildren: () => import('../feedback/feedback.module').then(m => m.FeedbackPageModule)
      },
      {
        path: 'lista-tratamentos',
        loadChildren: () => import('../lista-tratamentos/lista-tratamentos.module').then( m => m.ListaTratamentosPageModule)
      },
      {
        path: 'visualizar-tratamento',
        loadChildren: () => import('../visualizar-tratamento/visualizar-tratamento.module').then( m => m.VisualizarTratamentoPageModule)
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
