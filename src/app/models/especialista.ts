import { HorarioEspecialista } from "./horarioEspecialista";

export class Especialista {
  id?: number;
  nome: string;
  especialidade: string;
  horarios: HorarioEspecialista[]; // Lista de horários

  constructor(nome: string, especialidade: string, horarios: HorarioEspecialista[] = [], id?: number) {
    this.nome = nome;
    this.especialidade = especialidade;
    this.horarios = horarios;
    this.id = id;
  }
}
