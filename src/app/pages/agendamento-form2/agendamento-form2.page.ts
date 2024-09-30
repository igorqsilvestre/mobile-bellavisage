import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Tratamento } from 'src/app/models/tratamento';
import { DataUtilsService } from 'src/app/shared/services/dataUtils.service';

@Component({
  selector: 'app-agendamento-form2',
  templateUrl: './agendamento-form2.page.html',
  styleUrls: ['./agendamento-form2.page.scss'],
})
export class AgendamentoForm2Page implements OnInit {

  tratamentoDaDo!: Tratamento;
  dataSelecionada!: Date;

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
    private alertController: AlertController,
    private router: Router,
    private dataUtils: DataUtilsService
  ) { }

  ngOnInit() {
    this.tratamentoDaDo = this.recuperarInformacoesPacienteDaPaginaAgendamentoForm1();

    if(!this.tratamentoDaDo){
      throw new Error('Erro ao tentar recuperar os dados do agendamento');
    }

    // Aqui você pode pegar a data inicial que o ion-datetime seleciona automaticamente
    this.dataSelecionada = new Date();
    console.log('Data inicial capturada:', this.dataSelecionada);

    //this.geraHorariosParaOEspecialistaPelaData(this.dataSelecionada, this.tratamentoDaDo);

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
    console.log('Data selecionada:', selectedDate);
    // Aqui você pode executar o código que deseja quando uma data for selecionada
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirma o agendamento?',
      buttons: this.alertButtons,
      cssClass: 'custom-alert'
    });

    await alert.present();
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}
