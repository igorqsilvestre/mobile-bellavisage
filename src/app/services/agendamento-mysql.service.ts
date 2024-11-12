import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../models/agendamento';
import { catchError, map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoMysqlService {

  private readonly urlAgendamento = 'http://localhost:8081/api/v1/agendamento';

  constructor(private http: HttpClient) { }


   // Método para verificar se o MySQL está ativo
   verificarConexaoMysql(): Observable<boolean> {
    return this.http.get(`${this.urlAgendamento}/ping`).pipe(
      map(() => true), // Se a resposta for bem-sucedida, MySQL está ativo
      catchError((error) => {
        console.error('Erro ao verificar conexão com MySQL:', error);
        return of(false); // Em caso de erro, MySQL está inativo
      })
    );
  }


  addAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.urlAgendamento, agendamento).pipe(take(1));
  }

  getAllAgendamentosByPacienteId(pacienteId:number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.urlAgendamento}/paciente/${pacienteId}`).pipe(take(1));
  }

  deleteAgendamentoByPacienteId(id:number, pacienteId:number): Observable<Agendamento> {
    return this.http.delete<Agendamento>(`${this.urlAgendamento}/${id}/paciente/${pacienteId}`).pipe(take(1));
  }
}
