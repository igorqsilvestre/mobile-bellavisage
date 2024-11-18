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
  status = {aberto: "Aberto", concluido: "Concluido"};

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

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  async onDateChange(event: any) {

    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente && paciente.id){
      const data = new Date(event.detail.value);
      const lista = await this.agendamentoRepository.getAllAgendamentosByPacienteIdAndStatusAndData(paciente.id, this.status.concluido, data);
      if(lista){
       this.agendamentos = lista;
      }
    }
  }

  private async atualizarLista(){
    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente && paciente.id){
      const pacienteId =  paciente.id;
      const listaAgendamentos = await this.agendamentoRepository.getAllAgendamentosByPacienteIdAndStatus(pacienteId, this.status.concluido);
      if(listaAgendamentos){
        this.agendamentos = listaAgendamentos;
      }
    }
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
  }

}
