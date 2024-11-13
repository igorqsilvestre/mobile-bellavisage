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
          //await this.agendamentoSqliteService.addAgendamento(agendamento);
        }
        console.log('Sucesso ao adicionar agendamento');

      } catch (error) {
        console.error('Erro ao adicionar agendamento', error);
        throw new Error('Erro ao adicionar agendamento');
      }
    }

    public async atualizarParteAgendamento(agendamento: Agendamento): Promise<void> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          // Adiciona no MySQL via API
          await firstValueFrom(this.agendamentoMysqlService.atualizarParteAgendamento(agendamento));
        }else{
           // Agora salva o paciente no SQLite
          //await this.agendamentoSqliteService.addAgendamento(agendamento);
        }
        console.log('Sucesso ao atualizar agendamento');

      } catch (error) {
        console.error('Erro ao atualizar agendamento', error);
        throw new Error('Erro ao atualizar agendamento');
      }
    }


    public async deleteAgendamento(id: number): Promise<void> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          await firstValueFrom(this.agendamentoMysqlService.deleteAgendamento(id));
        }else{
          //await this.agendamentoSqliteService.deleteAgendamentoByPacienteId(id,pacienteId);
        }
      } catch (error) {
        console.error('Erro ao excluir agendamento', error);
        throw new Error('Erro ao excluir agendamento');
      }
    }


    public async getAllAgendamentosByPacienteIdAndStatus(pacienteId: number, status:string): Promise<Agendamento[] | null> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          return await firstValueFrom(this.agendamentoMysqlService.getAllAgendamentosByPacienteIdAndStatus(pacienteId, status));
        }else{
          //return this.agendamentoSqliteService.getAllAgendamentosByPacienteId(pacienteId);
          return null;
        }
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }

    async getAllAgendamentosTratamentosNomeStartingWithAndStatus(nome: string, status:string): Promise<Agendamento[] | null>{
      let agendamentos = null;
      try {
        const mysqlAtivo = await this.verificaStatusMysql();
        if(mysqlAtivo){
          agendamentos = await firstValueFrom(this.agendamentoMysqlService.getAllAgendamentosTratamentosNomeStartingWithAndStatus(nome,status));
        }
        return agendamentos;
  
      } catch (error) {
        console.error('Erro ao buscar agendamentos', error);
        throw new Error('Erro ao buscar agendamentos');
      }
    }


    private verificaStatusMysql(): Promise<boolean> {
      return firstValueFrom(this.agendamentoMysqlService.verificarConexaoMysql());
    }
}




