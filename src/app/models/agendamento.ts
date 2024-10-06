export class Agendamento {
  constructor(
    public id: number,
    public nomeTratamento: string,
    public imagemTratamento: string,
    public avaliacaoTratamento: number,
    public dataHorario: Date,
    public valor: number,
    public tratamento: number,
    public paciente: number | null = null,
  ){}
}
