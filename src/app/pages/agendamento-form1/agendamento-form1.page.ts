import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tratamento } from 'src/app/models/tratamento';

@Component({
  selector: 'app-agendamento-form1',
  templateUrl: './agendamento-form1.page.html',
  styleUrls: ['./agendamento-form1.page.scss'],
})
export class AgendamentoForm1Page implements OnInit {

  tratamentos:Tratamento[] = [
    {
      id:'1',
      nome: 'Pilling de Diamante',
      preco: 200,
      avaliacao: 4.9,
      imagemPequena: 'assets/Peeling-Quimico.jpg',
      imagemMaior: 'assets/Peeling-Quimico-Maior.jpg',
      descricao: `O peeling de diamante é um procedimento estético que realiza uma esfoliação profunda da pele, removendo células mortas e impurezas.
        É feito com uma caneta que possui uma ponteira com lixa diamantada e um sistema de vácuo que aspira a pele`,
      especialistas: [
        {
          id:'1',
          nome:'Dr Alessandro',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:'2',
          nome:'Dra Andreia',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:'3',
          nome:'Dr Romulo',
          especialidade: 'Dermatologista',
          horarios: null
        }
      ]
    },
    {
      id:'2',
      nome: 'Laser de Vênus',
      preco: 1000,
      avaliacao: 5.0,
      imagemPequena: 'assets/Laser-Venus.jpg',
      imagemMaior: 'assets/Laser-Venus.jpg',
      descricao: '',
      especialistas: [
        {
          id:'1',
          nome:'Dr Alessandro',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:'2',
          nome:'Dra Andreia',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:'3',
          nome:'Dr Romulo',
          especialidade: 'Dermatologista',
          horarios: null
        }
      ]
    },
    {
      id:'3',
      nome: 'Preenchimento labial',
      preco: 340,
      avaliacao: 3.1,
      imagemPequena: 'assets/Preenchimento-labial.jpeg',
      imagemMaior: 'assets/Preenchimento-labial.jpeg',
      descricao: '',
      especialistas: [
        {
          id:'1',
          nome:'Dr Alessandro',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:'2',
          nome:'Dra Andreia',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:'3',
          nome:'Dr Romulo',
          especialidade: 'Dermatologista',
          horarios: null
        }
      ]
    }
  ]



  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  irParaProximaPaginaCadastro(tratamento: Tratamento){
    if(tratamento){
      this.router.navigate(['/tabs/novo-agendamento-parte2'], {state: {tratamento}});
    }

  }
}
