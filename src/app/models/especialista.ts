export class Especialista {

  id?:number;
  nome:string;
  especialidade:string;
  registro:string;
  email:string;
  telefone:string;
  dataNascimento:Date;
  endereco: {
    cep:string;
    logradouro:string;
    bairro:string;
    numero:number;
    complemento:string;
    cidade:string;
    estado:string;
  }

  constructor(
    nome: string,
    especialidade: string,
    registro: string,
    email: string,
    telefone: string,
    dataNascimento: Date,
    endereco: {
      cep: string;
      logradouro: string;
      bairro: string;
      numero: number;
      complemento: string;
      cidade: string;
      estado: string;
    },
    id?: number,
  ) {
    this.id = id;
    this.nome = nome;
    this.especialidade = especialidade;
    this.registro = registro;
    this.email = email;
    this.telefone = telefone;
    this.dataNascimento = dataNascimento;
    this.endereco = endereco;
  }

}
