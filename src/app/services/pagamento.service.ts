import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private readonly urlPagamento = 'http://localhost:8081/api/v1/pagamento';

  constructor(private http: HttpClient) { }

  checkPagamentoExistsByAgendamentoId(agendamentoId: number): Observable<boolean> {
   return this.http.get<boolean>(`${this.urlPagamento}/exists/agendamento/${agendamentoId}`).pipe(take(1));
  }

}
