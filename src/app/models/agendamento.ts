export class Agendamento {
  id?: number;
  dataHorario: Date;
  valor: number;
  pacienteId: number;
  tratamentoId: number;
  especialistaId: number;
  horarioEspecialistaId: number; // Referência ao horário específico

  constructor(
    dataHorario: Date,
    valor: number,
    pacienteId: number,
    tratamentoId: number,
    especialistaId: number,
    horarioEspecialistaId: number,
    id?: number,
  ) {
    this.dataHorario = dataHorario;
    this.valor = valor;
    this.pacienteId = pacienteId;
    this.tratamentoId = tratamentoId;
    this.especialistaId = especialistaId;
    this.horarioEspecialistaId = horarioEspecialistaId;
    this.id = id;
  }
}