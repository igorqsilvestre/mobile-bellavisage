export class Paciente {
  id?: number;
  email: string;
  senha: string;
  nome: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date;
  endereco:{
    cep:string;
    logradouro:string;
    bairro:string;
    numero:number;
    complemento:string;
    cidade:string;
    estado:string;
  }

  constructor(email: string, senha: string, nome: string, cpf: string,
    telefone: string, dataNascimento: Date,
    endereco: {cep:string, logradouro:string, bairro: string,
      numero: number, complemento: string, cidade: string, estado:string} ,id?: number){

    this.email = email;
    this.senha = senha;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
    this.id = id;
  }

}
