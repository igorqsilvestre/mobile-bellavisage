import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Horario } from '../models/horario';
import { HorarioService } from '../services/horario.service';


@Injectable({
  providedIn: 'root'
})

export class HorarioRepository {

  constructor(
    private horarioService: HorarioService
  ) {}

    public async obterTodosApartirtratamentoEData(idTratamento:number, data:Date): Promise<Horario[] | null> {
      let horario = null;
      try {
       horario =  await firstValueFrom(this.horarioService.obterTodosApartirtratamentoEData(idTratamento, data));
       return horario;
      } catch (error) {
        console.error('Erro ao retornar agendamentos', error);
        throw new Error('Erro ao retornar agendamentos');
      }
    }
}




