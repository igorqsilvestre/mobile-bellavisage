export class Paciente {
  id: number;
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;

  constructor(id: number, email: string, senha: string, nome: string, cpf: string, telefone: string, dataNascimento: Date){
    this.id = id;
    this.email = email;
    this.senha = senha;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
  }
}
