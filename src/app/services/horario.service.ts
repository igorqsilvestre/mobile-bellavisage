import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private readonly urlHorario = 'http://localhost:8081/api/v1/horario';

  constructor(private http: HttpClient) { }

  obterTodosApartirtratamentoEData(idTratamento:number, data:Date ): Observable<Horario[]>{;
    return this.http.get<Horario[]>(`${this.urlHorario}/tratamento/${idTratamento}/data/${data}`).pipe(take(1));
  }
}
