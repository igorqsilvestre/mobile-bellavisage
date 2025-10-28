import { PagamentoRepository } from './../../repository/pagamento.repository';
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
  agendamentosComPodeExcluir!: { agendamento: Agendamento; podeExcluir: boolean }[];
  agendamento!: Agendamento;
  status = {aberto: "Aberto", concluido: "Concluido"};

  constructor(
    private navCtrl: NavController,
    private agendamentoRepository: AgendamentoRepository,
    private pagamentoRepository: PagamentoRepository,
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

  async alertaDeConfirmarOuCancelarAgendamento(agendamento: Agendamento, confirmar = true) {

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

  private async verificaSePodeExcuirAgendamento(agendamento: Agendamento): Promise<boolean> {
    if(agendamento){
      if(await this.pagamentoRepository.checkPagamentoExistsByAgendamentoId(agendamento.id!)){
        return false;
      }
    }
    return true;
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
    const status = this.status.concluido;

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



  private async atualizarLista(){
    const paciente = this.pacienteCompartilhadoService.getPaciente();

    if(!paciente?.id)return;

     const listaAgendamentos = await this.agendamentoRepository.getAllAgendamentosByPacienteIdAndStatus(paciente.id, this.status.aberto);

     if(!listaAgendamentos?.length){
      this.agendamentosComPodeExcluir = [];
      return;
    }

    this.agendamentosComPodeExcluir = await Promise.all(
      listaAgendamentos.map(async (agendamento) => ({
        agendamento,
        podeExcluir: await this.verificaSePodeExcuirAgendamento(agendamento),
      }))
    );
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
