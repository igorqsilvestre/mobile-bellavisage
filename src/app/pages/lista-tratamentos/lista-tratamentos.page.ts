import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-tratamentos',
  templateUrl: './lista-tratamentos.page.html',
  styleUrls: ['./lista-tratamentos.page.scss'],
})
export class ListaTratamentosPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.rolaApaginaAteOelemento();
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
