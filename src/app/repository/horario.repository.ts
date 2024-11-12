import { AgendamentoMysqlService } from '../services/agendamento-mysql.service';
import { Agendamento } from 'src/app/models/agendamento';

import { Injectable } from '@angular/core';
import { AgendamentoSqliteService } from '../services/agendamento-sqlite.service';
import { firstValueFrom } from 'rxjs';
import { HorarioMysqlService } from '../services/horario-mysql.service';
import { Horario } from '../models/horario';


@Injectable({
  providedIn: 'root'
})

export class HorarioRepository {

  constructor(
    private horarioMysqlService: HorarioMysqlService
  ) {}

    public async obterTodosApartirtratamentoEData(idTratamento:number, data:Date): Promise<Horario[] | null> {
      let horario = null;
      try {
        const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
        if(mysqlAtivo){
          horario =  await firstValueFrom(this.horarioMysqlService.obterTodosApartirtratamentoEData(idTratamento, data));
        }
        return horario;
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }


    private verificaStatusMysql(): Promise<boolean> {
      return firstValueFrom(this.horarioMysqlService.verificarConexaoMysql());
    }
}




