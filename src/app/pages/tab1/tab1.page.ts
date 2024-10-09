import { AgendamentoRepository } from './../../repository/agendamento.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  pacienteDaDo!: Paciente;
  pacienteNome: string = '';
  agendamentos!: Agendamento[];

  constructor(
    private router: Router,
    private agendamentoRepository: AgendamentoRepository
  ) {}


  async ngOnInit(): Promise<void> {
    this.pacienteDaDo = this.recuperarInformacoesPacienteDaPaginaLogin();
    this.pacienteNome = this.pacienteDaDo?.nome;
  }

  // Executa sempre que a página for exibida
  ionViewWillEnter() {
    this.atualizarLista();
  }

  recuperarInformacoesPacienteDaPaginaLogin() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['data']){
      return navigation.extras.state?.['data'];
    }
  }

  private async atualizarLista(){
    this.agendamentos = await this.agendamentoRepository.getAllAgendamentos();
  }
}
