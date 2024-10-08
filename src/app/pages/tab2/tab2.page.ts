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

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
      cssClass: 'alert-button-confirm',
    },
  ];

  constructor(
    private navCtrl: NavController,
    private agendamentoRepository: AgendamentoRepository,
    private alertController: AlertController
  ) {}

  // Executa sempre que a página for exibida
  ionViewWillEnter() {
    this.atualizarLista();
  }


  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  alertaDecancelarAgendamento(agendamento: Agendamento){
    this.agendamento = agendamento;
    this.isAlertOpen = true;
  }

  async setResult(ev:any) {
    if(ev.detail.role === 'confirm'){
      if(this.agendamento){
        try{
          this.agendamentoRepository.deleteAgendamento(this.agendamento.id as number);
          await this.presentAlert('sucesso', 'Agendamento cancelado com sucesso!');
          this.atualizarLista();
        }catch(error){
          await this.presentAlert('erro', 'Ocorreu um erro ao cancelar o agendamento.');
        }

      }
    }
  }

  private async atualizarLista(){
    this.agendamentos = await this.agendamentoRepository.getAllAgendamentos();
  }

  async presentAlert(tipo: 'sucesso' | 'erro', mensagem: string) {
    const alert = await this.alertController.create({
      header: tipo === 'sucesso' ? 'Sucesso' : 'Erro',
      message: mensagem,
      buttons: ['OK'],
      cssClass: 'custom-alert '
    });

    await alert.present();
    return await alert.onDidDismiss();
  }


}
