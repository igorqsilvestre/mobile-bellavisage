import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agendamento-form1',
  templateUrl: './agendamento-form1.page.html',
  styleUrls: ['./agendamento-form1.page.scss'],
})
export class AgendamentoForm1Page implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }
}
