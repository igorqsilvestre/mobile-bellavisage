import { Injectable } from '@angular/core';
import { PagamentoService } from '../services/pagamento.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PagamentoRepository {

    constructor(
    private pagamentoService: PagamentoService
  ) {}

  async checkPagamentoExistsByAgendamentoId(agendamentoId: number): Promise<boolean> {
    try {
      return await firstValueFrom(this.pagamentoService.checkPagamentoExistsByAgendamentoId(agendamentoId));
    } catch (error) {
      console.error('Erro ao verificar pagamento', error);
      throw new Error('Erro ao verificar pagamento');
    }
  }
}
