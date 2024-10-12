import { PacienteCompartilhadoService } from './../../shared/services/paciente-compartilhado.service';
import { AgendamentoRepository } from './../../repository/agendamento.repository';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Agendamento } from 'src/app/models/agendamento';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  isAlertOpen = false;
  agendamentos!: Agendamento[];
  agendamento!: Agendamento;

  constructor(
    private navCtrl: NavController,
    private agendamentoRepository: AgendamentoRepository,
    private alertController: AlertController,
    private pacienteCompartilhadoService: PacienteCompartilhadoService,
  ) {}


  // Executa sempre que a página for exibida
  ionViewDidEnter() {
    this.atualizarLista();
  }


  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  async alertaDecancelarAgendamento(agendamento: Agendamento) {
    this.agendamento = agendamento;
    const alert = await this.alertController.create({
      header: 'Cancelar Agendamento?',
      cssClass: 'custom-alert', // Adicione sua classe personalizada aqui
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => this.confirmarCancelamento(),
        },
      ],
    });

    await alert.present();
  }

  async confirmarCancelamento() {
    const pacienteId = this.buscarIdPaciente();
    if (this.agendamento && this.agendamento.id && pacienteId) {
      try {
        await this.agendamentoRepository.deleteAgendamentoByPacienteId(this.agendamento.id, pacienteId);
        await this.presentAlert('sucesso', 'Agendamento cancelado com sucesso!');
        this.atualizarLista();
      } catch (error) {
        await this.presentAlert('erro', 'Ocorreu um erro ao cancelar o agendamento.');
      }
    }
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
      this.agendamentos = await this.agendamentoRepository.getAllAgendamentosByPacienteId(pacienteId);
    }
  }

  async presentAlert(tipo: 'sucesso' | 'erro', mensagem: string) {
    const alert = await this.alertController.create({
      header: tipo === 'sucesso' ? 'Sucesso' : 'Erro',
      message: mensagem,
      buttons: ['OK'],
      cssClass: 'custom-alert', // Adicione sua classe personalizada aqui
    });

    await alert.present();
    return await alert.onDidDismiss();
  }


}
