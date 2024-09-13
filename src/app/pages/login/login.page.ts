import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{

  constructor( private route: Router,) { }

  ngOnInit(): void {
  }


  fazerLogin(){
    //Aqui ele verifica as informações de login

    //Vai para a página home
    console.log('estou aqui');
    this.route.navigate(['/home']);

  }

}
