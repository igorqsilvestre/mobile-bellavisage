export class Especialista {

  id: string;
  nome: string;
  especialidade: string;
  horarios: Date[];

  constructor(id: string, nome: string, especialidade: string, horarios: Date[]){
    this.id = id;
    this.nome = nome;
    this.especialidade = especialidade;
    this.horarios = horarios;
  }
}
