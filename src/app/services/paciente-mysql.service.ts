import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, take, } from 'rxjs';
import { Paciente } from '../models/paciente';


@Injectable({
  providedIn: 'root'
})
export class PacienteMysqlService {

  private readonly url = 'http://localhost:8080/api/v1/paciente';


  constructor(private http: HttpClient) {}

// Método para verificar se o MySQL está ativo
verificarConexaoMysql(): Observable<boolean> {
  return this.http.get(`${this.url}/ping`).pipe(
    map(() => true), // Se a resposta for bem-sucedida, MySQL está ativo
    catchError((error) => {
      console.error('Erro ao verificar conexão com MySQL:', error);
      return of(false); // Em caso de erro, MySQL está inativo
    })
  );
}

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.url, paciente).pipe(take(1));
  }

  atualizaPacienteBySenha(senha:string, paciente: Paciente): Observable<Paciente> {
    return this.http.patch<Paciente>(`${this.url}/senha/${senha}`, paciente).pipe(take(1));
  }

  getPacienteByID(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}/${id}`).pipe(take(1));
  }

  getPacienteByCPF(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}/cpf/${cpf}`).pipe(take(1));
  }

  getPacienteByEmail(email: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}/email/${email}`).pipe(take(1));
  }

  getPacienteByEmailAndSenha(email: string, senha: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}/email/${email}/senha/${senha}`).pipe(take(1));
  }

    //private readonly agendamentoPath = 'agendamento';
  /*
  addAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.baseUrl}/${this.agendamentoPath}`, agendamento)
      .pipe(catchError(this.handleError));
  }

  getAllAgendamentos(pacienteId: number): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/${this.agendamentoPath}/paciente/${pacienteId}`)
      .pipe(catchError(this.handleError));
  }

  deleteAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.agendamentoPath}/${id}`)
      .pipe(catchError(this.handleError));
  }
  */



}
