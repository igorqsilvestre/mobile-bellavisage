import { Especialista } from "./especialista";
import { Horario } from "./horario";
import { Paciente } from "./paciente";
import { Tratamento } from "./tratamento";

export class Agendamento {
  id?:number;
  paciente: Paciente[] | Paciente | any;
  especialista: Especialista[] | Especialista | any;
  tratamento: Tratamento[] | Tratamento | any;
  horario: Horario[] | Horario | any;
  valor: number;
  status: string | null;
  avaliacao: number | null;

  constructor(paciente: Paciente[] | Paciente | any, especialista:Especialista[] | Especialista | any,
    tratamento: Tratamento[] | Tratamento | any, horario:  Horario[] | Horario | any, 
    valor: number, status:string | null, avaliacao:number | null ,id?: number){

    this.paciente = paciente;
    this.especialista = especialista;
    this.tratamento = tratamento;
    this.horario = horario;
    this.valor = valor;
    this.status = status;
    this.avaliacao = avaliacao;
    this.id = id;
  }

}
