export class Agendamento {
  id: string;
  nomeTratamento: string;
  imagemTratamento: string;
  avaliacaoTratamento: number;
  dataHorario: Date;
  preco: number;

  constructor(id: string, nomeTratamento: string, imagemTratamento:string, avaliacaoTratamento: number, dataHorario: Date, preco: number){
    this.id = id;
    this.nomeTratamento = nomeTratamento;
    this.imagemTratamento = imagemTratamento;
    this.avaliacaoTratamento = avaliacaoTratamento;
    this.dataHorario = dataHorario;
    this.preco = preco;
  }

}
