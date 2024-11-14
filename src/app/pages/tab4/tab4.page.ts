import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoRepository } from 'src/app/repository/agendamento.repository';
import { PacienteCompartilhadoService } from 'src/app/shared/services/paciente-compartilhado.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  agendamentos!: Agendamento[];

  constructor(
    private agendamentoRepository: AgendamentoRepository,
    private pacienteCompartilhadoService: PacienteCompartilhadoService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

   // Executa sempre que a página for exibida
   ionViewDidEnter() {
    this.atualizarLista();
  }

  async handleInput(event:CustomEvent) {
    const query = event.detail.value.toLowerCase() as string;

    const lista = await this.agendamentoRepository.getAllAgendamentosTratamentosNomeStartingWithAndStatus(query,"Concluido");
    if(lista){
      this.agendamentos = lista;
    }
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  buscarIdPaciente():number {
    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente && paciente.id){
      return paciente.id;
    }
    throw new Error('Não foi possível buscar o id do paciente.');
  }

  private async atualizarLista(){
    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente && paciente.id){
      const pacienteId =  paciente.id;
      const listaAgendamentos = await this.agendamentoRepository.getAllAgendamentosByPacienteIdAndStatus(pacienteId, "Concluido");
      if(listaAgendamentos){
        this.agendamentos = listaAgendamentos;
      }
    }
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
  }

}
