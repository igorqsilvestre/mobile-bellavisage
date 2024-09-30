import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  pacienteDaDo!: Paciente;
  pacienteNome: string = '';

  constructor(
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.pacienteDaDo = this.recuperarInformacoesPacienteDaPaginaLogin();
    this.pacienteNome = this.pacienteDaDo.nome;

  }

  recuperarInformacoesPacienteDaPaginaLogin() {
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state?.['data']){
      return navigation.extras.state?.['data'];
    }
  }

}
