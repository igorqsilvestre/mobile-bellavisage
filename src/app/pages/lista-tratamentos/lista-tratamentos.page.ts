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
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

}
