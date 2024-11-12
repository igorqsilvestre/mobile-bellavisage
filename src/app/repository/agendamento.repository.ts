import { AgendamentoMysqlService } from './../services/agendamento-mysql.service';
import { Agendamento } from 'src/app/models/agendamento';

import { Injectable } from '@angular/core';
import { AgendamentoSqliteService } from '../services/agendamento-sqlite.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AgendamentoRepository {

  constructor(
    private agendamentoSqliteService: AgendamentoSqliteService,
    private agendamentoMysqlService: AgendamentoMysqlService
  ) {}

    // Adicionar agendamento no SQLite ou IndexedDB

    public async addAgendamento(agendamento: Agendamento): Promise<void> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          // Adiciona no MySQL via API
          await firstValueFrom(this.agendamentoMysqlService.addAgendamento(agendamento));
        }else{
           // Agora salva o paciente no SQLite
          await this.agendamentoSqliteService.addAgendamento(agendamento);
        }
        console.log('Sucesso ao adicionar agendamento');

      } catch (error) {
        console.error('Erro ao adicionar agendamento', error);
        throw new Error('Erro ao adicionar agendamento');
      }
    }


    public async deleteAgendamentoByPacienteId(id: number, pacienteId:number): Promise<void> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          await firstValueFrom(this.agendamentoMysqlService.deleteAgendamentoByPacienteId(id, pacienteId));
        }else{
          await this.agendamentoSqliteService.deleteAgendamentoByPacienteId(id,pacienteId);
        }
      } catch (error) {
        console.error('Erro ao excluir agendamento', error);
        throw new Error('Erro ao excluir agendamento');
      }
    }

    public async getAllAgendamentosByPacienteId(pacienteId: number): Promise<Agendamento[]> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          return await firstValueFrom(this.agendamentoMysqlService.getAllAgendamentosByPacienteId(pacienteId));
        }else{
          return this.agendamentoSqliteService.getAllAgendamentosByPacienteId(pacienteId);
        }
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }


    private verificaStatusMysql(): Promise<boolean> {
      return firstValueFrom(this.agendamentoMysqlService.verificarConexaoMysql());
    }
}




