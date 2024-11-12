
export class Tratamento {
  id?:number;
  nome: string;
  valor: number;
  descricao: string;
  funcionamento: string;
  indicacoes: string;
  imagem: string; // Imagem em Base64
  tipoImagem?:string;

  constructor(nome: string,valor:number,descricao:string,
    funcionamento:string,indicacoes:string, imagem:string,tipoImagem?:string,id?: number){

    this.nome = nome;
    this.valor = valor;
    this.descricao = descricao;
    this.funcionamento = funcionamento;
    this.indicacoes = indicacoes;
    this.imagem = imagem;
    this.tipoImagem = tipoImagem;
    this.id = id;
  }
}
