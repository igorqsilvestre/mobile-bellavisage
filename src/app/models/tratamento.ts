import { Especialista } from "./especialista";

export class Tratamento {
  id?: number;
  nome: string;
  preco: number;
  avaliacao: number;
  imagemPequena: string;
  imagemMaior: string;
  descricao:string;
  especialistas: Especialista[];

  constructor(nome: string, preco: number,
    avaliacao: number, imagemPequena: string,
    imagemMaior: string, descricao: string, especialistas: Especialista[],id?: number){

    this.nome = nome;
    this.preco = preco;
    this.avaliacao = avaliacao;
    this.imagemPequena = imagemPequena;
    this.imagemMaior = imagemMaior;
    this.descricao = descricao;
    this.especialistas = especialistas;
    this.id = id;
  }
}
