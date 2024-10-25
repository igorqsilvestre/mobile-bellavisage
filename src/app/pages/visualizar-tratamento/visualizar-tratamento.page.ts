import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TratamentoDetails } from 'src/app/models/tratamento-details';

@Component({
  selector: 'app-visualizar-tratamento',
  templateUrl: './visualizar-tratamento.page.html',
  styleUrls: ['./visualizar-tratamento.page.scss'],
})
export class VisualizarTratamentoPage implements OnInit {

  tratamento:TratamentoDetails = {nome: '',imagemMaior:'' ,descricao: '', funcionamento: '', indicacoes: '' };
  listaIndicacoes!: string[];

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.tratamento = this.recuperarInformacoesTratamento();
    this.separaAsIndicacoes();
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  separaAsIndicacoes(){
    if(this.tratamento){
      this.listaIndicacoes = this.tratamento.indicacoes
      .trim()
      .split('\n')
      .map((item:string) => item.trim());
    }
  }

  recuperarInformacoesTratamento(){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['tratamento']){
      return navigation.extras.state?.['tratamento'];
    }
  }

}
