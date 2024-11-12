import { Injectable } from "@angular/core";
import { Tratamento } from "../models/tratamento";
import { TratamentoMysqlService } from "../services/tratamento-mysql.service";
import { firstValueFrom } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class TratamentoRepository {

  constructor(
    private tratamentoMysqlService: TratamentoMysqlService
  ) {}


  async getAllTratamento(): Promise<Tratamento[] | null>{
    let tratamentos = null;
    try {
      const mysqlAtivo = await this.verificaStatusMysql();
      if(mysqlAtivo){
        tratamentos = await firstValueFrom(this.tratamentoMysqlService.getAllTratamentos());
      }
      return tratamentos;

    } catch (error) {
      console.error('Erro ao buscar tratamentos', error);
      throw new Error('Erro ao buscar tratamentos');
    }
  }

  async getAllTratamentosByNomeStartingWith(nome: string): Promise<Tratamento[] | null>{
    let tratamentos = null;
    try {
      const mysqlAtivo = await this.verificaStatusMysql();
      if(mysqlAtivo){
        tratamentos = await firstValueFrom(this.tratamentoMysqlService.getAllTratamentosByNomeStartingWith(nome));
      }
      return tratamentos;

    } catch (error) {
      console.error('Erro ao buscar tratamentos', error);
      throw new Error('Erro ao buscar tratamentos');
    }
  }

  private verificaStatusMysql(): Promise<boolean> {
    return firstValueFrom(this.tratamentoMysqlService.verificarConexaoMysql());
  }
}
