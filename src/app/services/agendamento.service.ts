import { AgendamentoRepository } from '../repository/agendamento.repository';

import { Agendamento } from './../models/agendamento';
import { BvApiService } from './bv-api.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { PacienteService } from './paciente.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
constructor(
  private agendamentoRepository: AgendamentoRepository,
  private dvApiService: BvApiService,
  private pacienteService: PacienteService
) {}

  // Adicionar agendamento no SQLite ou IndexedDB

  public async addAgendamento(agendamento: Agendamento): Promise<void> {
    const paciente = await this.pacienteService.getPacienteLogado();
    if(!paciente) {
      throw new Error('Paciente não logado');
    }
    agendamento.paciente = paciente.id;

    const newAgendamento = await this.dvApiService.addAgendamento(agendamento);
    agendamento.id = newAgendamento.id;
    return await this.agendamentoRepository.addAgendamento(agendamento);
  }
// Metodo para buscar todos os agendamentos
  public async getAllAgendamentos(): Promise<Agendamento[]> {
    const paciente = await this.pacienteService.getPacienteLogado()
    if(!paciente) {
      throw new Error('Paciente não logado');
    }

    const agendamentos = await this.dvApiService.getAllAgendamentos(paciente.id);
    if(!agendamentos) {
      return await this.agendamentoRepository.getAllAgendamentos();
    }
    return agendamentos;
  }


  public async deleteAgendamento(id: number): Promise<void> {
    const agendamento = await this.dvApiService.deleteAgendamento(id);
    if(!agendamento) {
      return await this.agendamentoRepository.deleteAgendamento(id);
    }
    return agendamento;

  }
}
