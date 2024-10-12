import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private usuarioAutenticado: boolean = false;
  private nomeAutenticacao: string = 'usuarioAutenticado';

  constructor() {
    this.usuarioAutenticado = sessionStorage.getItem(this.nomeAutenticacao) === 'true';
  }

  realizarLogin() {
    this.usuarioAutenticado = true;
    sessionStorage.setItem(this.nomeAutenticacao, this.usuarioAutenticado.toString());
  }

  realizarLogout(){
    this.usuarioAutenticado = false;
    sessionStorage.removeItem(this.nomeAutenticacao);
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
