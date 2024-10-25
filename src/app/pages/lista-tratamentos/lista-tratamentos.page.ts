import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TratamentoDetails } from 'src/app/models/tratamento-details';

@Component({
  selector: 'app-lista-tratamentos',
  templateUrl: './lista-tratamentos.page.html',
  styleUrls: ['./lista-tratamentos.page.scss'],
})
export class ListaTratamentosPage implements OnInit {

  private tratamentos: TratamentoDetails[] = [
    {
      id: 1,
      nome: 'Carboxiterapia',
      imagemMaior: 'assets/carboxiterapia-maior.jpg',
      descricao:
      `
        A carboxiterapia é um tratamento estético e terapêutico que envolve a injeção de um gás sob a pele com
        a finalidade de melhorar a circulação, estimular a produção de colágeno e promover a oxigenação dos tecidos.
        Resultados cientificamente comprovados para o tratamento de celulite, flacidez, gordura localizada e estrias.
      `,
      funcionamento:
      `
      A carboxiterapia consiste na aplicação de um gás atóxico, anidro-carbônico, diretamente no tecido celular sub-cutâneo,
      com total controle da velocidade e do volume injetado.
      Ao se difundir pelo tecido , o gás promove vasodilatação (melhora da circulação), ao mesmo tempo em que estimula o
      catabolismo dos triglicérides (queima da gordura), atuando assim nas causas da celulite e da flacidez simultaneamente.
      `,
      indicacoes:
      `
      Celulite
      Estrias
      Flacidez
      Gordura Localizada
      Olheiras
      Pré e Pós operatório de lipoaspiração
      `

    },
    {
      id: 2,
      nome: 'Depilação a laser',
      imagemMaior: 'assets/Depilacao-a-laser-Maior.jpg',
      descricao:
      `
      A depilação a laser é um tratamento estético utilizado para remover os pelos de forma duradoura, através da aplicação de luz concentrada emitida por um aparelho de laser.
      Essa luz penetra na pele e atinge o folículo piloso, onde o pelo cresce, destruindo-o gradualmente e impedindo que novos pelos se formem.
      `,
      funcionamento:
      `
       Utiliza-se equipamentos que emitem um feixe suave de luz que passa através da pele até ao folículo piloso onde é absorvido.
       Esta energia transforma-se em calor e destrói as células responsáveis pelo nascimento e crescimento dos pelos, sem danificar a pele.
       Para destruir o pelo e impedir que nasça novamente, é preciso atingi-lo num estágio específico do seu crescimento.
      `,
      indicacoes:
      `
      Redução duradoura de pelos
      Pelagem escura em pele clara
      Foliculite
      Redução de irritação e alergias
      `

    },
    {
      id: 3,
      nome: 'Drenagem Linfática',
      imagemMaior: 'assets/Drenagem-lifatica-Maior.jpg',
      descricao: `
      É uma técnica desenvolvida com o intuito de remover líquido e resíduos extra-celulares dos tecidos.
      Tradicionalmente é realizada de forma manual, mas pode ser realizada também pelo aparelho de endermoterapia,
      aplicando-se uma pressão leve e de baixa velocidade em direção aos gânglios linfáticos.
      `,
      funcionamento:
      `
      Utiliza-se movimentos suaves e precisos. A drenagem linfática envolve movimentos leves, ritmados e direcionados, aplicados com pressão baixa e constantes.
      Esses movimentos seguem o fluxo natural da linfa, geralmente direcionados para os gânglios linfáticos (como os que ficam no pescoço, axilas e virilha).
      `,
      indicacoes:
      `
      Retenção hídrica
      Lipodistrofia ginóide (gordura localizada)
      Celulite
      Pré e pós-operatório de cirurgia plástica
      Pré e pós-lipoaspiração
      `,
    },
    {
      id: 4,
      nome: 'Hiperidrose - Suor Excessivo',
      imagemMaior: 'assets/Hialuronidase-Maior.jpeg',
      descricao: `
      Este distúrbio caracteriza-se por um suor excessivo e incontrolável em áreas específicas do corpo, como axilas, palmas das mãos e plantas dos pés.
      A Hiperidrose pode causar desconforto intenso e prejudicar a vida social, afetiva e profissional do paciente.
      `,
      funcionamento:
      `
      O uso da Toxina B tipo A bloqueia a transmissão nervosa das glândulas sudoríparas, reduzindo significativamente a produção de suor.
      Com apenas uma sessão, você pode ficar livre do suor excessivo por até 6 meses.
      `,
      indicacoes:
      `
      Antitranspirantes clínicos
      Terapias com iontoforese
      Medicamentos orais
      `
    },
    {
      id: 5,
      nome: 'Laser de Vênus',
      imagemMaior: 'assets/Laser-Venus-Maior.jpg',
      descricao: `O Venus Laser é uma tecnologia avançada utilizada para procedimentos estéticos e dermatológicos,
      focada em melhorar a aparência da pele e tratar diversas condições. Ele usa uma combinação de energia laser e radiofrequência que penetra nas camadas mais profundas da pele
      `,
      funcionamento:
      `
      Combina a luz gerada por leds e lasers para proporcionar ação analgésica, anti-inflamatória e bioestimulação de colágeno.
      O equipamento é composto pelos leds azul e âmbar e lasers infravermelho e vermelho.
      `,
      indicacoes:
      `
      Redução de gordura localizada
      Flacidez da pele
      Celulite
      Melhora da circulação sanguínea

      `

    },
    {
      id: 6,
      nome: 'Pilling de Diamante',
      imagemMaior: 'assets/Peeling-Quimico-Maior.jpg',
      descricao:
      `
      O peeling de diamante é um procedimento estético que realiza uma esfoliação profunda da pele, removendo células mortas e impurezas.
      É feito com uma caneta que possui uma ponteira com lixa diamantada e um sistema de vácuo que aspira a pele
      `,
      funcionamento:
      `
       Utiliza-se um aparelho com ponteiras revestidas de diamante para esfoliar a pele.
       Durante o tratamento, a ponteira é passada sobre a pele, removendo as células mortas da camada mais superficial da epiderme,
       promovendo uma esfoliação mecânica.
       É uma técnica não invasiva que visa melhorar a textura e a aparência da pele, promovendo a renovação celular.
      `,
      indicacoes:
      `
      Textura irregular da pele
      Cicatrizes de acne
      Manchas e hiperpigmentação
      Sinais de envelhecimento
      `

    },
    {
      id: 7,
      nome: 'Ultrassom microfocado',
      imagemMaior: 'assets/Ultrassom-microfocado-maior.jpg',
      descricao: `É um tratamento estético não invasivo que utiliza ondas
      de ultrassom para penetrar nas camadas mais profundas da pele, promovendo o
      quecimento controlado do tecido. Esse calor estimula a produção de colágeno e elastina, resultando em um efeito de lifting e firmeza da pele.
      `,
      funcionamento:
      `
      Essa tecnologia utiliza o calor para promover a melhora da flacidez. As ondas do ultrassom conseguem alcançar e aquecer as camadas mais profundas da pele e
      é o único aparelho do mercado que atinge o Sistema Músculo-Aponeurótico Superficial - SMAS, responsável pela sustentação.
      `,
      indicacoes:
      `
      Combater a flacidez
      Reduzir as rugas;
      Rejuvenescer a pele;
      Arquear as sobrancelhas;
      `
    },
  ]


  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.rolaApaginaAteOelemento();
  }

  onCarregarTratamento(nome:string){
    if(nome){
      const nomePequeno = nome.toLocaleLowerCase();
      const tratamentos = this.tratamentos.filter((t) => t.nome.toLowerCase().indexOf(nomePequeno) > -1);
      if(tratamentos){
        const [tratamento] = tratamentos;
        this.router.navigate(['/tabs/visualizar-tratamento'], {state: {tratamento}});
      }
    }

  }


  rolaApaginaAteOelemento() {
    // Seleciona todos os links que devem ativar o scroll
    const links = document.querySelectorAll('.scroll-link');

    // Adiciona o listener de evento de clique para cada link
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Evita o redirecionamento padrão

        const targetId = (event.target as HTMLElement).getAttribute('data-target');
        const targetElement = document.getElementById(targetId!);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até o elemento
        }
      });
    });
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

}
