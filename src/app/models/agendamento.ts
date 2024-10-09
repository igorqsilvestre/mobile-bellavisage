export class Agendamento {
  id?: number;
  nomeTratamento: string;
  imagemTratamento: string;
  avaliacaoTratamento: number;
  dataHorario: Date;
  preco: number;

  constructor(nomeTratamento: string, imagemTratamento:string, avaliacaoTratamento: number, dataHorario: Date, preco: number,id?: number){
    this.nomeTratamento = nomeTratamento;
    this.imagemTratamento = imagemTratamento;
    this.avaliacaoTratamento = avaliacaoTratamento;
    this.dataHorario = dataHorario;
    this.preco = preco;
    this.id = id;
  }

}