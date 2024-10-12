export class Agendamento {
  id?: number;
  nomeTratamento: string;
  imagemTratamento: string;
  avaliacaoTratamento: number;
  dataHorario: Date;
  preco: number;
  paciente: { id: number };

  constructor(nomeTratamento: string, imagemTratamento:string,
    avaliacaoTratamento: number, dataHorario: Date, preco: number, pacienteId:number,id?: number){

    this.nomeTratamento = nomeTratamento;
    this.imagemTratamento = imagemTratamento;
    this.avaliacaoTratamento = avaliacaoTratamento;
    this.dataHorario = dataHorario;
    this.preco = preco;
    this.paciente = {id: pacienteId};
    this.id = id;
  }

}
