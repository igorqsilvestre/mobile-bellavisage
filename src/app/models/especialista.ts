export class Especialista {

  id: string;
  nome: string;
  especialidade: string;
  horarios: Date[] | null;

  constructor(id: string, nome: string, especialidade: string, horarios: Date[] | null){
    this.id = id;
    this.nome = nome;
    this.especialidade = especialidade;
    this.horarios = horarios;
  }
}
