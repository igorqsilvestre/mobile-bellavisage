
import { PacienteUpdate } from './../models/paciente-update';
import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { firstValueFrom } from 'rxjs';
import { Login } from '../models/login';
import { PacienteService } from '../services/paciente.service';

@Injectable({
  providedIn: 'root'
})

export class PacienteRepository {

  constructor(private pacienteService: PacienteService) {}

  public async addPaciente(paciente: Paciente): Promise<void> {
    try {
     await firstValueFrom(this.pacienteService.addPaciente(paciente));
    } catch (error) {
      console.error('Erro ao adicionar paciente', error);
      throw new Error('Erro ao adicionar paciente');
    }
  }


  public async verificaCredenciaisLogin(login: Login): Promise<boolean> {
    let existeLogin = false;
    try {
    existeLogin = await firstValueFrom(this.pacienteService.existsLogin(login));
    return existeLogin;
    } catch (error) {
      console.error('Erro ao adicionar paciente', error);
      throw new Error('Erro ao adicionar paciente');
    }
  }

   public async updatePacienteParcialmente(id:number, pacienteUpdate: PacienteUpdate) : Promise<void>{
    try{
    await firstValueFrom(this.pacienteService.atualizaPacienteParcialmente(id, pacienteUpdate));
    }catch(error){
      console.error('Erro ao atualizar ', error);
      throw new Error('Erro ao atualizar ');
    }
  }


  public async getPacienteById(id:number): Promise<Paciente | null> {
    let paciente = null;
    try{
      paciente = await firstValueFrom(this.pacienteService.getPacienteByID(id));
      return paciente;
    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  public async getPacienteByEmail(email: string): Promise<Paciente | null> {
    let paciente = null;
    try{
      paciente = await firstValueFrom(this.pacienteService.getPacienteByEmail(email));
      return paciente;
    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }


  public async getPacienteByCPF(cpf: string): Promise<Paciente | null> {
    let paciente = null;
    try{
     paciente = await firstValueFrom(this.pacienteService.getPacienteByCPF(cpf));
     return paciente;
    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

}
