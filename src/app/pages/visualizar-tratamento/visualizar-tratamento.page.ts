import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tratamento } from 'src/app/models/tratamento';

@Component({
  selector: 'app-visualizar-tratamento',
  templateUrl: './visualizar-tratamento.page.html',
  styleUrls: ['./visualizar-tratamento.page.scss'],
})
export class VisualizarTratamentoPage implements OnInit {

  tratamento!:Tratamento;
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

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
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
