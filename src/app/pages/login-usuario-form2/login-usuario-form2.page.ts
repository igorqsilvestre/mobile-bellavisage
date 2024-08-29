import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-usuario-form2',
  templateUrl: './login-usuario-form2.page.html',
  styleUrls: ['./login-usuario-form2.page.scss'],
})
export class LoginUsuarioForm2Page implements OnInit {

  constructor( 
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }
}
