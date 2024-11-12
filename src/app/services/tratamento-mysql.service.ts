import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { Tratamento } from '../models/tratamento';

@Injectable({
  providedIn: 'root'
})
export class TratamentoMysqlService {

  private readonly urlTratamento = 'http://localhost:8081/api/v1/tratamento';

  constructor(private http: HttpClient) { }

  // Método para verificar se o MySQL está ativo
  verificarConexaoMysql(): Observable<boolean> {
    return this.http.get(`${this.urlTratamento}/ping`).pipe(
      map(() => true), // Se a resposta for bem-sucedida, MySQL está ativo
      catchError((error) => {
        console.error('Erro ao verificar conexão com MySQL:', error);
        return of(false); // Em caso de erro, MySQL está inativo
      })
    );
  }

  getAllTratamentos(): Observable<Tratamento[]> {
    return this.http.get<Tratamento[]>(`${this.urlTratamento}`).pipe(take(1));
  }

  getAllTratamentosByNomeStartingWith(nome:string): Observable<Tratamento[]>{
    const params = new HttpParams().set('nome',nome);
    return this.http.get<Tratamento[]>(`${this.urlTratamento}/buscar`, { params });
  }

}
