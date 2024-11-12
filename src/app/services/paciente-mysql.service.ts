import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { Paciente } from '../models/paciente';
import { PacienteUpdate } from '../models/paciente-update';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class PacienteMysqlService {

  private readonly urlPaciente = 'http://localhost:8081/api/v1/paciente';

  constructor(private http: HttpClient) { }

  // Método para verificar se o MySQL está ativo
  verificarConexaoMysql(): Observable<boolean> {
    return this.http.get(`${this.urlPaciente}/ping`).pipe(
      map(() => true), // Se a resposta for bem-sucedida, MySQL está ativo
      catchError((error) => {
        console.error('Erro ao verificar conexão com MySQL:', error);
        return of(false); // Em caso de erro, MySQL está inativo
      })
    );
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.urlPaciente, paciente).pipe(take(1));
  }

  atualizaPacienteParcialmente(id:number, paciente: PacienteUpdate): Observable<Paciente> {
    return this.http.patch<Paciente>(`${this.urlPaciente}/${id}`, paciente).pipe(take(1));
  }

  getPacienteByID(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.urlPaciente}/${id}`).pipe(take(1));
  }

  getPacienteByCPF(cpf: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.urlPaciente}/cpf/${cpf}`).pipe(take(1));
  }

  getPacienteByEmail(email: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.urlPaciente}/email/${email}`).pipe(take(1));
  }

  existsLogin(login: Login): Observable<boolean>{
    return this.http.post<boolean>(`${this.urlPaciente}/logar`, login).pipe(take(1));
  }

}