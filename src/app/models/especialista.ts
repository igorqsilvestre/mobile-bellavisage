export class Especialista {

  id?: number;
  nome: string;
  especialidade: string;
  horarios: Date[] | null;

  constructor(nome: string, especialidade: string, horarios: Date[] | null, id?: number){ 
    this.nome = nome;
    this.especialidade = especialidade;
    this.horarios = horarios;
    this.id = id;
  }
}
