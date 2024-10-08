export class HorarioEspecialista {
    id?: number;
    especialistaId: number;
    dataHorario: Date; // A data e horario de um dia especifico
  
    constructor(especialistaId: number, dataHorario: Date, id?: number) {
      this.especialistaId = especialistaId;
      this.dataHorario = dataHorario;
      this.id = id;
    }
  }