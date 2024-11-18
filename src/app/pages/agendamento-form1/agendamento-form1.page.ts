import { TratamentoRepository } from './../../repository/tratamento.repository';
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

  tratamentosAExibir!: Tratamento[] | null;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private tratamentoRepository:TratamentoRepository
  ) { }


  async ngOnInit(): Promise<void> {
    this.tratamentosAExibir =  await this.tratamentoRepository.getAllTratamento();
  }

  voltarPaginaAnterior(){
    this.navCtrl.back();
  }

  getImageUrl(base64:string, tipoImagem = 'data:image/jpeg;'): string {
    return `${tipoImagem}base64,${base64}`;
  }

  async handleInput(event:CustomEvent) {
    const query = event.detail.value.toLowerCase();
    const lista = await this.tratamentoRepository.getAllTratamentosByNomeStartingWith(query);
    if(lista){
      this.tratamentosAExibir = lista;
    }
  }

  irParaProximaPaginaCadastro(tratamento: Tratamento){
    if(tratamento){
      this.router.navigate(['/tabs/novo-agendamento-parte2'], {state: {tratamento}});
    }

  }
}
