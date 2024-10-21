import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  emojiSelecionado: string | null = null;

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }


  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  selecionarEmoji(emoji:string){
    this.emojiSelecionado = emoji;
  }

}
