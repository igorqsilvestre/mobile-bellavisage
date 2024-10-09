import { Agendamento } from 'src/app/models/agendamento';

import { Injectable } from '@angular/core';
import { AgendamentoSqliteService } from '../services/agendamento-sqlite.service';
import { ApiMysqlService } from '../services/api-mysql.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AgendamentoRepository {
  
  constructor(
    private agendamentoSqliteService: AgendamentoSqliteService,
    private apiMysqlService: ApiMysqlService
  ) {}

    // Adicionar agendamento no SQLite ou IndexedDB

    public async addAgendamento(agendamento: Agendamento): Promise<void> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          // Adiciona no MySQL via API
          await firstValueFrom(this.apiMysqlService.addAgendamento(agendamento));
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


    public async deleteAgendamento(id: number): Promise<void> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          await firstValueFrom(this.apiMysqlService.deleteAgendamento(id));
        }else{
          await this.agendamentoSqliteService.deleteAgendamento(id);
        }
      } catch (error) {
        console.error('Erro ao excluir agendamento', error);
        throw new Error('Erro ao excluir agendamento');
      }
    }

    public async getAllAgendamentos(): Promise<Agendamento[]> {
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          return await firstValueFrom(this.apiMysqlService.getAllAgendamentos());
        }else{
          return this.agendamentoSqliteService.getAllAgendamentos();
        }
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }


  
    private verificaStatusMysql(): Promise<boolean> {
      return firstValueFrom(this.apiMysqlService.verificarConexaoMysql());
    }
}




