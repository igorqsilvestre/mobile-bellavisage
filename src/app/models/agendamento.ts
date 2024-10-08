import { Especialista } from "./especialista";
import { Paciente } from "./paciente";
import { Tratamento } from "./tratamento";

export class Agendamento {
  id?: number;
  dataHorario: Date;
  paciente: Paciente;
  tratamento: Tratamento;
  especialista: Especialista;
 

  constructor(dataHorario: Date, preco: number, paciente:Paciente, id?: number){

    this.dataHorario = dataHorario;
    
    this.paciente = paciente;
    this.id = id;
  }

}
