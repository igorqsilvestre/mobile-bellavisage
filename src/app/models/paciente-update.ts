export interface PacienteUpdate {
  senha?:string;
  email?:string;
  telefone?:string;
  endereco?: {
    cep?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    logradouro?: string;
    cidade?: string;
    estado?: string;
  };
}
