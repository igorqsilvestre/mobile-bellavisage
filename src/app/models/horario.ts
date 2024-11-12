import { Especialista } from "./especialista";
import { Tratamento } from "./tratamento";

export class Horario {
  id?:number;
  especialista: Especialista[] | Especialista | any;
  tratamento: Tratamento[] | Tratamento | any;
  data: Date;
  disponibilidade:boolean;

  constructor(especialista:Especialista[] | Especialista | any,
    tratamento: Tratamento[] | Tratamento | any,
    data: Date, disponibilidade: boolean, id?:number
  ){

  this.especialista = especialista;
  this.tratamento = tratamento;
  this.data = data;
  this.disponibilidade = disponibilidade;
  this.id = id;
  }
}
