export class Paciente {
  id?: number;
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;

  constructor(email: string, senha: string, nome: string, cpf: string, telefone: string, dataNascimento: Date,id?: number){
    this.email = email;
    this.senha = senha;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
    this.id = id;
  }

}
