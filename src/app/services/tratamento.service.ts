import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Tratamento } from '../models/tratamento';

@Injectable({
  providedIn: 'root'
})
export class TratamentoService {

  private readonly urlTratamento = 'http://localhost:8081/api/v1/tratamento';

  constructor(private http: HttpClient) { }

  getAllTratamentos(): Observable<Tratamento[]> {
    return this.http.get<Tratamento[]>(`${this.urlTratamento}`).pipe(take(1));
  }

  getAllTratamentosByNomeStartingWith(nome:string): Observable<Tratamento[]>{
    const params = new HttpParams().set('nome',nome);
    return this.http.get<Tratamento[]>(`${this.urlTratamento}/buscar`, { params });
  }

  getAllTratamentosOrdenados(): Observable<Tratamento[]>{
    return this.http.get<Tratamento[]>(`${this.urlTratamento}/ordenados`);
  }
}
