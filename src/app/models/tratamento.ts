
export class Tratamento {
  id?: number;
  nome: string;
  preco: number;
  avaliacao: number;
  imagemPequena: string;
  imagemMaior: string;
  descricao: string;

  constructor(nome: string, preco: number, avaliacao: number,
    imagemPequena:string, imagemMaior:string , descricao:string ,id?: number) {

    this.nome = nome;
    this.preco = preco;
    this.avaliacao = avaliacao;
    this.imagemPequena = imagemPequena;
    this.imagemMaior = imagemMaior;
    this.descricao = descricao;
    this.id = id;
  }
}
