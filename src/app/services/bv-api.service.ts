import { Injectable } from "@angular/core";
import Axios from "axios";
import { Agendamento } from "../models/agendamento";
import { Paciente } from "../models/paciente";

@Injectable({
  providedIn: 'root'
})
export class BvApiService {

  private readonly baseUrl = 'http://localhost:8080/api/v1';
  private readonly pacientePath = 'paciente';
  private readonly agendamentoPath = 'agendamento';

  async getPacienteByCPF(cpf: string): Promise<Paciente| null> {
    try {
      const result = await Axios.get<Paciente>(`${this.baseUrl}/${this.pacientePath}/cpf/${cpf}`);
      return result.data;
    } catch (error) {
      console.error('Erro ao buscar paciente por CPF', error);
      return null;
    }
  }
  async getPacienteByEmail(email: string): Promise<Paciente| null> {
    try {
      const result = await Axios.get<Paciente>(`${this.baseUrl}/${this.pacientePath}/email/${email}`);
      return result.data;
    } catch (error) {
      console.error('Erro ao buscar paciente por CPF', error);
      return null;
    }
  }
  async getPacienteByEmailAndSenha(email: string, senha: string): Promise<Paciente| null> {
    try {
      const result = await Axios.get<Paciente>(`${this.baseUrl}/${this.pacientePath}/email/${email}/${senha}`);
      return result.data;
    } catch (error) {
      console.error('Erro ao buscar paciente por CPF', error);
      return null;
    }
  }
  async addPaciente(paciente: Paciente): Promise<Paciente> {
    const result = await Axios.post<Paciente>(`${this.baseUrl}/${this.pacientePath}`, paciente);
    return result.data;
  }

  async addAgendamento(agendamento: Agendamento): Promise<Agendamento> {
    const result = await Axios.post<Agendamento>(`${this.baseUrl}/${this.agendamentoPath}`, agendamento);
    return result.data;
  }
  async getAllAgendamentos(pacienteId: number): Promise<Agendamento[] | null> {
    try{
      const result = await Axios.get<Agendamento[]>(`${this.baseUrl}/${this.agendamentoPath}/paciente/${pacienteId}`);
      return result.data;
    } catch (error) {
      console.error('Erro ao buscar agendamentos', error);
      return null;
    }


  }
// // Metodo para deletar um agendamento
  async deleteAgendamento(id: number) {

    try {
      const result = await Axios.delete(`${this.baseUrl}/${this.agendamentoPath}/${id}`);
      return result.data;
    }
    catch (error) {
      console.error('Erro ao deletar agendamento', error);
      return null;
    }

  }

}
