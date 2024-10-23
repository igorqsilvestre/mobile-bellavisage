import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tratamento } from 'src/app/models/tratamento';

@Component({
  selector: 'app-agendamento-form1',
  templateUrl: './agendamento-form1.page.html',
  styleUrls: ['./agendamento-form1.page.scss'],
})
export class AgendamentoForm1Page implements OnInit{

  tratamentosAExibir!: Tratamento[];

  private tratamentos:Tratamento[] = [
    {
      id: 1,
      nome: 'Pilling de Diamante',
      preco: 200,
      avaliacao: 4.9,
      imagemPequena: 'assets/Peeling-Quimico.jpg',
      imagemMaior: 'assets/Peeling-Quimico-Maior.jpg',
      descricao: `O peeling de diamante é um procedimento estético que realiza uma esfoliação profunda da pele, removendo células mortas e impurezas.
        É feito com uma caneta que possui uma ponteira com lixa diamantada e um sistema de vácuo que aspira a pele`,
      especialistas: [
        {
          id:1,
          nome:'Dr Alessandro',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:2,
          nome:'Dra Andreia',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:3,
          nome:'Dr Romulo',
          especialidade: 'Dermatologista',
          horarios: null
        }
      ]
    },
    {
      id: 2,
      nome: 'Laser de Vênus',
      preco: 1000,
      avaliacao: 5.0,
      imagemPequena: 'assets/Laser-Venus.jpg',
      imagemMaior: 'assets/Laser-Venus-Maior.jpg',
      descricao: `O Venus Laser é uma tecnologia avançada utilizada para procedimentos estéticos e dermatológicos,
      focada em melhorar a aparência da pele e tratar diversas condições. Ele usa uma combinação de energia laser e radiofrequência que penetra nas camadas mais profundas da pele`,
      especialistas: [
        {
          id:1,
          nome:'Dra Fernanda',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:2,
          nome:'Dr Pedro',
          especialidade: 'Dermatologista',
          horarios: null
        },
      ]
    },
    {
      id: 3,
      nome: 'Drenagem Linfática',
      preco: 440,
      avaliacao: 3.1,
      imagemPequena: 'assets/Drenagem-lifatica.jpg',
      imagemMaior: 'assets/Drenagem-lifatica-Maior.jpg',
      descricao: `É uma técnica desenvolvida com o intuito de remover líquido e resíduos extra-celulares dos tecidos.
      Tradicionalmente é realizada de forma manual, mas pode ser realizada também pelo aparelho de endermoterapia`,
      especialistas: [
        {
          id:1,
          nome:'Dr Marcelo',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:2,
          nome:'Dra Andreia',
          especialidade: 'Fisioterapeuta',
          horarios: null
        },
        {
          id:3,
          nome:'Dr Romulo',
          especialidade: 'Fisioterapeuta',
          horarios: null
        },
        {
          id:4,
          nome:'Dr Joao',
          especialidade: 'Dermatologista',
          horarios: null
        }
      ]
    },
    {
      id: 4,
      nome: 'Hiperidrose - Suor Excessivo',
      preco: 620,
      avaliacao: 4.4,
      imagemPequena: 'assets/Hialuronidase.jpeg',
      imagemMaior: 'assets/Hialuronidase-Maior.jpeg',
      descricao: `Utiliza a Toxina B tipo A para bloquear a transmissão nervosa das glândulas sudoríparas,
      reduzindo significativamente a produção de suor. Uma sessão pode te deixar livre do suor excessivo por até 6 meses.`,
      especialistas: [
        {
          id:1,
          nome:'Dr Joao',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:2,
          nome:'Dr Marcelo',
          especialidade: 'Dermatologista',
          horarios: null
        },
      ]
    },
    {
      id: 5,
      nome: 'Carboxiterapia',
      preco: 2200,
      avaliacao: 5.0,
      imagemPequena: 'assets/carboxiterapia.jpg',
      imagemMaior: 'assets/carboxiterapia-maior.jpg',
      descricao: `A carboxiterapia é um tratamento estético e terapêutico que envolve a injeção de dióxido de carbono (CO₂) sob a pele com
        a finalidade de melhorar a circulação, estimular a produção de colágeno e promover a oxigenação dos tecidos.`,
      especialistas: [
        {
          id:1,
          nome:'Dra Fernanda',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:2,
          nome:'Dr Pedro',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:3,
          nome:'Dr Renan',
          especialidade: 'Biomedico',
          horarios: null
        },
        {
          id:4,
          nome:'Dra Amanda',
          especialidade: 'Biomedica',
          horarios: null
        },
      ]
    },
    {
      id: 6,
      nome: 'Ultrassom microfocado',
      preco: 366,
      avaliacao: 4.7,
      imagemPequena: 'assets/Ultrassom-microfocado.jpg',
      imagemMaior: 'assets/Ultrassom-microfocado-maior.jpg',
      descricao: `É um tratamento estético não invasivo que utiliza ondas
        de ultrassom para penetrar nas camadas mais profundas da pele, promovendo o
        quecimento controlado do tecido. Esse calor estimula a produção de colágeno e elastina, resultando em um efeito de lifting e firmeza da pele. `,
      especialistas: [
        {
          id:1,
          nome:'Dr Rai',
          especialidade: 'Dermatologista',
          horarios: null
        },
        {
          id:2,
          nome:'Dr Andre',
          especialidade: 'Dermatologista',
          horarios: null
        },

      ]
    },
  ]

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.tratamentosAExibir = this.tratamentos;
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  handleInput(event:CustomEvent) {
    const query = event.detail.value.toLowerCase();
    this.tratamentosAExibir = this.tratamentos.filter((d) => d.nome.toLowerCase().indexOf(query) > -1);
  }

  irParaProximaPaginaCadastro(tratamento: Tratamento){
    if(tratamento){
      this.router.navigate(['/tabs/novo-agendamento-parte2'], {state: {tratamento}});
    }

  }
}
