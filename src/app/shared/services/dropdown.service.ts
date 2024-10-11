import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(): Observable<any>{
    return this.http.get('assets/dados/estadosbr.json').pipe(take(1));
  }

  getEstadoBySigla(sigla: string): Observable<any> {
    return this.getEstadosBr().pipe(
      map((estados: any[]) => estados.find(estado => estado.sigla === sigla))
  )}
}
