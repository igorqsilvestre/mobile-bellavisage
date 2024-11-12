import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioMysqlService {

  private readonly urlHorario = 'http://localhost:8081/api/v1/horario';

  constructor(private http: HttpClient) { }

 // Método para verificar se o MySQL está ativo
 verificarConexaoMysql(): Observable<boolean> {
  return this.http.get(`${this.urlHorario}/ping`).pipe(
    map(() => true), // Se a resposta for bem-sucedida, MySQL está ativo
    catchError((error) => {
      console.error('Erro ao verificar conexão com MySQL:', error);
      return of(false); // Em caso de erro, MySQL está inativo
    })
  );
}

obterTodosApartirtratamentoEData(idTratamento:number, data:Date ): Observable<Horario[]>{;
  return this.http.get<Horario[]>(`${this.urlHorario}/tratamento/${idTratamento}/data/${data}`).pipe(take(1));
}

}
