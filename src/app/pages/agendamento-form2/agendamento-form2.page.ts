import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
import { Tratamento } from 'src/app/models/tratamento';
import { DataUtilsService } from 'src/app/shared/services/dataUtils.service';
import { Agendamento } from 'src/app/models/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';

@Component({
  selector: 'app-agendamento-form2',
  templateUrl: './agendamento-form2.page.html',
  styleUrls: ['./agendamento-form2.page.scss'],
})
export class AgendamentoForm2Page implements OnInit {

  isAlertOpen = false;
  tratamentoDaDo!: Tratamento;
  data!: Date;
  dataHorarioEscolhido!: Date;

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
    private router: Router,
    private dataUtils: DataUtilsService,
    private agendamentoService: AgendamentoService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.tratamentoDaDo = this.recuperarInformacoesPacienteDaPaginaAgendamentoForm1();

    if(!this.tratamentoDaDo){
      throw new Error('Erro ao tentar recuperar os dados do agendamento');
    }

    this.data = new Date();
    this.geraHorariosParaOEspecialistaPelaData(this.data, this.tratamentoDaDo);

  }


  geraHorariosParaOEspecialistaPelaData(dataSelecionada: Date, tratamentoDaDo: Tratamento) {
    if(tratamentoDaDo){
      tratamentoDaDo.especialistas.forEach(especialista => {
        especialista.horarios = this.dataUtils.gerarHorariosAleatorios(dataSelecionada);
      });
    }
  }

  recuperarInformacoesPacienteDaPaginaAgendamentoForm1(){
     const navigation = this.router.getCurrentNavigation();
      if(navigation?.extras?.state?.['tratamento']){
      return navigation.extras.state?.['tratamento'];
    }
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.data = new Date(selectedDate);
    this.geraHorariosParaOEspecialistaPelaData(this.data, this.tratamentoDaDo)
  }

  presentAlertHorario(horario: Date) {
    this.dataHorarioEscolhido = horario;
    this.isAlertOpen = true;
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  async setResult(ev:any) {
    if(ev.detail.role === 'confirm'){
      const agendamentoId = uuidv4();

      const agendamento = new Agendamento(
       agendamentoId,
       this.tratamentoDaDo?.nome,
       this.tratamentoDaDo?.imagemPequena,
       this.tratamentoDaDo?.avaliacao,
       this.dataHorarioEscolhido,
       this.tratamentoDaDo?.preco
      );

      try {
        this.agendamentoService.addAgendamento(agendamento);
        await this.presentAlert('sucesso', 'Agendamento realizado com sucesso!');
        this.router.navigate(['/tabs/tab1']);

      } catch (error) {
        await this.presentAlert('erro', 'Ocorreu um erro ao realizar o agendamento.');
      }
    }
    this.isAlertOpen = false;
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
