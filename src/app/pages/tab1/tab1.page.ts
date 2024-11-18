import { AuthService } from './../../guards/auth.service';
import { AgendamentoRepository } from './../../repository/agendamento.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agendamento } from 'src/app/models/agendamento';
import { PacienteCompartilhadoService } from 'src/app/shared/services/paciente-compartilhado.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  pacienteNome: string = '';
  agendamentos!: Agendamento[];

  constructor(
    private agendamentoRepository: AgendamentoRepository,
    private pacienteCompartilhadoService: PacienteCompartilhadoService,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    const paciente = this.recuperarInformacoesPacienteDaPaginaLogin();
    if(paciente){
      this.pacienteCompartilhadoService.setPaciente(paciente);
    }

  }


  ionViewDidEnter() {
    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente){
      this.pacienteNome = paciente.nome.includes(" ") ? paciente.nome.split(" ")[0] : paciente.nome;
    }

    this.atualizarLista();
  }

  async handleInput(event:CustomEvent) {
    const query = event.detail.value.toLowerCase() as string;

    const lista = await this.agendamentoRepository.getAllAgendamentosTratamentosNomeStartingWithAndStatus(query,"Aberto");
    if(lista){
      this.agendamentos = lista;
    }
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
  }

  deslogar(){
    this.authService.realizarLogout();
    this.pacienteCompartilhadoService.clearPaciente();
    this.router.navigate(['']).then(() => {
      window.location.reload();  // Força um recarregamento completo
    });
  }

  private async atualizarLista(){
    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente && paciente.id){
      const pacienteId =  paciente.id;
      const listaAgendamentos = await this.agendamentoRepository.getAllAgendamentosByPacienteIdAndStatus(pacienteId, "Aberto");
      if(listaAgendamentos){
        this.agendamentos = listaAgendamentos;
      }
    }
  }

  recuperarInformacoesPacienteDaPaginaLogin() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['paciente']){
      return navigation.extras.state?.['paciente'];
    }
  }
}
