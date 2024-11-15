import { HorarioRepository } from './../../repository/horario.repository';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

import { Tratamento } from 'src/app/models/tratamento';

import { AgendamentoRepository } from 'src/app/repository/agendamento.repository';
import { Agendamento } from 'src/app/models/agendamento';
import { PacienteCompartilhadoService } from 'src/app/shared/services/paciente-compartilhado.service';
import { Horario } from 'src/app/models/horario';
import { Especialista } from 'src/app/models/especialista';

@Component({
  selector: 'app-agendamento-form2',
  templateUrl: './agendamento-form2.page.html',
  styleUrls: ['./agendamento-form2.page.scss'],
})
export class AgendamentoForm2Page implements OnInit, OnDestroy {

  isAlertOpen = false;
  tratamentoDaDo!: Tratamento;
  data!: Date;
  horarioEscolhido!: Horario;
  horarios!: Horario[];
  especialistasUnicos!: Especialista[] | null;

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
    private agendamentoRepository: AgendamentoRepository,
    private alertController: AlertController,
    private pacienteCompartilhadoService: PacienteCompartilhadoService,
    private horarioRepository:HorarioRepository
  ) { }



  ngOnInit() {
    this.tratamentoDaDo = this.recuperarInformacoesPacienteDaPaginaAgendamentoForm1();

    if(!this.tratamentoDaDo){
      throw new Error('Erro ao tentar recuperar os dados do agendamento');
    }

  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
  }

  recuperarInformacoesPacienteDaPaginaAgendamentoForm1(){
     const navigation = this.router.getCurrentNavigation();
      if(navigation?.extras?.state?.['tratamento']){
      return navigation.extras.state?.['tratamento'];
    }
  }

  async onDateChange(event: any) {

    if(this.tratamentoDaDo){
      const idTratamento = this.tratamentoDaDo.id;
      const data = new Date(event.detail.value);

      if(idTratamento){
        const lista = await this.horarioRepository.obterTodosApartirtratamentoEData(idTratamento, data);

        if(lista){
          this.horarios = lista;
          this.especialistasUnicos = Array.from(
            new Map(lista.map(horario => [horario.especialista.id, horario.especialista])).values()
          );
        }
      }
    }
  }

  presentAlertHorario(horario: Horario) {
    this.horarioEscolhido = horario;
    this.isAlertOpen = true;
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  async setResult(ev:any) {

    if(ev.detail.role === 'confirm'){


      const pacienteId = this.buscarIdPaciente();

      if(pacienteId){
        const agendamento = new Agendamento(
          pacienteId,
          this.horarioEscolhido.especialista.id,
          this.tratamentoDaDo.id,
          this.horarioEscolhido.id,
          this.tratamentoDaDo.valor,
          null,
          null
         );

         try {
           this.agendamentoRepository.addAgendamento(agendamento);
           await this.presentAlert('sucesso', 'Agendamento realizado com sucesso!');
           this.router.navigate(['/tabs/tab1']);

         } catch (error) {
           await this.presentAlert('erro', 'Ocorreu um erro ao realizar o agendamento.');
         }
      }

      this.isAlertOpen = false;
    }


  }


  buscarIdPaciente():number {
    const paciente = this.pacienteCompartilhadoService.getPaciente();
    if(paciente && paciente.id){
      return paciente.id;
    }
    throw new Error('Não foi possível buscar o id do paciente.');
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

  ngOnDestroy(): void {
    this.especialistasUnicos = null;
  }
}
