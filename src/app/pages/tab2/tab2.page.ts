import { PacienteCompartilhadoService } from './../../shared/services/paciente-compartilhado.service';
import { AgendamentoRepository } from './../../repository/agendamento.repository';
import { Component } from '@angular/core';
import { AlertController, AlertInput, NavController } from '@ionic/angular';
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

  async handleInput(event:CustomEvent) {
    const query = event.detail.value.toLowerCase() as string;

    const lista = await this.agendamentoRepository.getAllAgendamentosTratamentosNomeStartingWithAndStatus(query,"Aberto");
    if(lista){
      this.agendamentos = lista;
    }
  }


  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  async alertaDeConfirmarOuCancelarAgendamento(agendamento: Agendamento, confirmar = false) {

    let cabecalho ='Cancelar Agendamento?';
    let messagem = '';
    let alertaInputs!:AlertInput[];

    if(confirmar){
      cabecalho = 'Confirmar Agendamento?';
      messagem = 'Avalie o agendamento:';
      alertaInputs = [
        { label: '1', type: 'radio', value: 1 }, 
        { label: '2', type: 'radio', value: 2 },
        { label: '3', type: 'radio', value: 3 },
        { label: '4', type: 'radio', value: 4 },
        { label: '5', type: 'radio', value: 5 },
      ];
     
    }

    this.agendamento = agendamento;
    const alert = await this.alertController.create({
      header: cabecalho,
      cssClass: 'custom-alert', // Adicione sua classe personalizada aqui
      message: messagem,
      inputs: alertaInputs,
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
          handler: (avaliacao) => {
            if(confirmar){
              this.confirmarAgendamento(avaliacao);
            }else{
              this.confirmarCancelamento();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmarCancelamento() {
    if (this.agendamento && this.agendamento.id) {
      try {
        await this.agendamentoRepository.deleteAgendamento(this.agendamento.id);
        await this.presentAlert('sucesso', 'Agendamento cancelado com sucesso!');
        this.atualizarLista();
      } catch (error) {
        await this.presentAlert('erro', 'Ocorreu um erro ao cancelar o agendamento.');
      }
    }
  }

  async confirmarAgendamento(avaliacao: number) {
    const avaliado = avaliacao ? avaliacao : null;
    const status = "Concluido";

    if (this.agendamento) {
      this.agendamento.avaliacao = avaliado;
      this.agendamento.status = status;
      try {
        await this.agendamentoRepository.atualizarParteAgendamento(this.agendamento);
        await this.presentAlert('sucesso', 'Agendamento confirmado com sucesso!');
        this.atualizarLista();
      } catch (error) {
        await this.presentAlert('erro', 'Ocorreu um erro ao confirmar o agendamento.');
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
      const listaAgendamentos = await this.agendamentoRepository.getAllAgendamentosByPacienteIdAndStatus(pacienteId, "Aberto");
      if(listaAgendamentos){
        this.agendamentos = listaAgendamentos;
      }
    }
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
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
