import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../models/agendamento';
import { Observable,take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private readonly urlAgendamento = 'http://localhost:8081/api/v1/agendamento';

  constructor(private http: HttpClient) { }


  addAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.urlAgendamento, agendamento).pipe(take(1));
  }

  getAllAgendamentosByPacienteIdAndStatus(pacienteId:number, status:string): Observable<Agendamento[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Agendamento[]>(`${this.urlAgendamento}/paciente/${pacienteId}/status`, { params }).pipe(take(1));
  }

  getAllAgendamentosByPacienteIdAndStatusAndDate(pacienteId:number, status:string, data: Date): Observable<Agendamento[]> {
    const params = new HttpParams().set('status', status).set('data', data.toISOString().split('T')[0]);
    return this.http.get<Agendamento[]>(`${this.urlAgendamento}/paciente/${pacienteId}/status/data`, { params }).pipe(take(1));
  }

  getAllAgendamentosTratamentosNomeStartingWithAndStatus(nome: string, status:string): Observable<Agendamento[]> {
    const params = new HttpParams().set('nome',nome).set('status',status);
    return this.http.get<Agendamento[]>(`${this.urlAgendamento}/buscar`, { params });

  }

  deleteAgendamento(id:number): Observable<Agendamento> {
    return this.http.delete<Agendamento>(`${this.urlAgendamento}/${id}`).pipe(take(1));
  }

  atualizarParteAgendamento(agendamento: Agendamento): Observable<Agendamento>{
    return this.http.patch<Agendamento>(`${this.urlAgendamento}/${agendamento.id}`, agendamento).pipe(take(1));
  }
}
