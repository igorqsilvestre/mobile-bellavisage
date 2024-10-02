import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { Paciente } from 'src/app/models/paciente';
import { AgendamentoService } from 'src/app/services/agendamento.service';

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
    private agendamentoService: AgendamentoService
  ) {}


  async ngOnInit(): Promise<void> {
    this.pacienteDaDo = this.recuperarInformacoesPacienteDaPaginaLogin();
    this.pacienteNome = this.pacienteDaDo?.nome;
    this.agendamentos = await this.agendamentoService.getAllAgendamentos();
    console.log(this.agendamentos);
  }

  recuperarInformacoesPacienteDaPaginaLogin() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['data']){
      return navigation.extras.state?.['data'];
    }
  }

}
