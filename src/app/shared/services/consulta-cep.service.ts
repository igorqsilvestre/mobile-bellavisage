import { catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string): Observable<Cep | null> {

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get<Cep | {erro: boolean}>(`//viacep.com.br/ws/${cep}/json`).pipe(
          map(resposta => {
            if('erro' in resposta){
              return null;
            }else{
              return resposta;
            }
          }),
          catchError(() => of(null)),
          take(1)
        )
      }
    }
    return of(null);
  }
}

export interface Cep {
  logradouro:string;
  complemento:string;
  bairro:string;
  localidade:string;
  uf: string;
}
