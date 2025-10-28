import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tratamento } from 'src/app/models/tratamento';
import { TratamentoRepository } from 'src/app/repository/tratamento.repository';

@Component({
  selector: 'app-lista-tratamentos',
  templateUrl: './lista-tratamentos.page.html',
  styleUrls: ['./lista-tratamentos.page.scss'],
})
export class ListaTratamentosPage implements OnInit {

  letras!: string[];
  letrasComTratamentos!:{letra:string, tratamentos:Tratamento[]}[];


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private tratamentoRepository:TratamentoRepository
  ) { }

  ngOnInit() {
    this.atualizaLista();
    this.rolaApaginaAteOelemento();

  }


  async atualizaLista() {
    const lista = await this.tratamentoRepository.getAllTratamentosOrdenados();
    if(lista){
      this.criarObjetoLetrasComTratamentos(lista);
    }
  }

  private criarObjetoLetrasComTratamentos(tratamentos: Tratamento[]) {
    const agrupado = tratamentos.reduce((acc, tratamento) => {
      // Obtenha a primeira letra do nome do tratamento
      const letra = tratamento.nome[0].toUpperCase();

      // Verifique se a letra já existe no agrupamento
      if (!acc[letra]) {
        acc[letra] = [];
      }

      // Adicione o tratamento ao grupo correspondente
      acc[letra].push(tratamento);

      return acc;
    }, {} as { [letra: string]: Tratamento[] });

    this.letras = Object.keys(agrupado);

    // Converta o objeto em um array de objetos com a estrutura desejada
    this.letrasComTratamentos = Object.keys(agrupado).map(letra => ({
      letra,
      tratamentos: agrupado[letra]
    }));
  }



  onCarregarTratamento(tratamento:Tratamento){
    if(tratamento){
       this.router.navigate(['/tabs/visualizar-tratamento'], {state: {tratamento}});
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
