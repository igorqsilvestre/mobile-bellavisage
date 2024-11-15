import { Agendamento } from 'src/app/models/agendamento';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AgendamentoService } from '../services/agendamento.service';


@Injectable({
  providedIn: 'root'
})

export class AgendamentoRepository {

  constructor(
    private agendamentoService: AgendamentoService
  ) {}

    // Adicionar agendamento no SQLite ou IndexedDB

    public async addAgendamento(agendamento: Agendamento): Promise<void> {
      try {
        await firstValueFrom(this.agendamentoService.addAgendamento(agendamento));
      } catch (error) {
        console.error('Erro ao adicionar agendamento', error);
        throw new Error('Erro ao adicionar agendamento');
      }
    }

    public async atualizarParteAgendamento(agendamento: Agendamento): Promise<void> {
      try {
        await firstValueFrom(this.agendamentoService.atualizarParteAgendamento(agendamento));
      } catch (error) {
        console.error('Erro ao atualizar agendamento', error);
        throw new Error('Erro ao atualizar agendamento');
      }
    }


    public async deleteAgendamento(id: number): Promise<void> {
      try {
        await firstValueFrom(this.agendamentoService.deleteAgendamento(id));
      } catch (error) {
        console.error('Erro ao excluir agendamento', error);
        throw new Error('Erro ao excluir agendamento');
      }
    }


    public async getAllAgendamentosByPacienteIdAndStatus(pacienteId: number, status:string): Promise<Agendamento[] | null> {
      try {
        return await firstValueFrom(this.agendamentoService.getAllAgendamentosByPacienteIdAndStatus(pacienteId, status));
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }

    public async getAllAgendamentosByPacienteIdAndStatusAndData(pacienteId: number, status:string, data:Date): Promise<Agendamento[] | null> {
      try {
        return await firstValueFrom(this.agendamentoService.getAllAgendamentosByPacienteIdAndStatusAndDate(pacienteId, status, data));
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }

    async getAllAgendamentosTratamentosNomeStartingWithAndStatus(nome: string, status:string): Promise<Agendamento[] | null>{
      let agendamentos = null;
      try {
       agendamentos = await firstValueFrom(this.agendamentoService.getAllAgendamentosTratamentosNomeStartingWithAndStatus(nome,status));
       return agendamentos;
      } catch (error) {
        console.error('Erro ao buscar agendamentos', error);
        throw new Error('Erro ao buscar agendamentos');
      }
    }
}




