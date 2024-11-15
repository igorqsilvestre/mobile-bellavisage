import { Injectable } from "@angular/core";
import { Tratamento } from "../models/tratamento";
import { firstValueFrom } from "rxjs";
import { TratamentoService } from "../services/tratamento.service";


@Injectable({
  providedIn: 'root'
})

export class TratamentoRepository {

  constructor(
    private tratamentoService: TratamentoService
  ) {}


  async getAllTratamento(): Promise<Tratamento[] | null>{
    let tratamentos = null;
    try {
    tratamentos = await firstValueFrom(this.tratamentoService.getAllTratamentos());
    return tratamentos;
    } catch (error) {
      console.error('Erro ao buscar tratamentos', error);
      throw new Error('Erro ao buscar tratamentos');
    }
  }

  async getAllTratamentosOrdenados(): Promise<Tratamento[] | null>{
    let tratamentos = null;
    try {
    tratamentos = await firstValueFrom(this.tratamentoService.getAllTratamentosOrdenados());
    return tratamentos;
    } catch (error) {
      console.error('Erro ao buscar tratamentos', error);
      throw new Error('Erro ao buscar tratamentos');
    }
  }

  async getAllTratamentosByNomeStartingWith(nome: string): Promise<Tratamento[] | null>{
    let tratamentos = null;
    try {
      tratamentos = await firstValueFrom(this.tratamentoService.getAllTratamentosByNomeStartingWith(nome));
      return tratamentos;
    } catch (error) {
      console.error('Erro ao buscar tratamentos', error);
      throw new Error('Erro ao buscar tratamentos');
    }
  }
}
