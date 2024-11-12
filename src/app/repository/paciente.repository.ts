import { PacienteMysqlService } from './../services/paciente-mysql.service';
import { PacienteUpdate } from './../models/paciente-update';
import { Injectable } from '@angular/core';
import { PacienteSqliteService } from '../services/paciente-sqlite.service';
import { Paciente } from '../models/paciente';
import { firstValueFrom } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})

export class PacienteRepository {

  constructor(
    private pacientesqliteService: PacienteSqliteService,
    private pacienteMysqlService: PacienteMysqlService
  ) {}

  // Adicionar paciente no Mysql ou Sqlite
  public async addPaciente(paciente: Paciente): Promise<void> {
    try {
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        // Adiciona no MySQL via API
        await firstValueFrom(this.pacienteMysqlService.addPaciente(paciente));
      }else{
         // Agora salva o paciente no SQLite
        await this.pacientesqliteService.addPaciente(paciente);
      }
      console.log('Sucesso ao adicionar paciente');

    } catch (error) {
      console.error('Erro ao adicionar paciente', error);
      throw new Error('Erro ao adicionar paciente');
    }

  }


  public async verificaCredenciaisLogin(login: Login): Promise<boolean> {
    let existeLogin = false;
    try {
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        // Adiciona no MySQL via API
        existeLogin = await firstValueFrom(this.pacienteMysqlService.existsLogin(login));
      }else{
         // Agora salva o paciente no SQLite
        //await this.pacientesqliteService.addPaciente(paciente);
      }
      return existeLogin;

    } catch (error) {
      console.error('Erro ao adicionar paciente', error);
      throw new Error('Erro ao adicionar paciente');
    }
  }


   // Atualizar senha do paciente no Mysql ou Sqlite
   public async updatePacienteParcialmente(id:number, pacienteUpdate: PacienteUpdate) : Promise<void>{
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        await firstValueFrom(this.pacienteMysqlService.atualizaPacienteParcialmente(id, pacienteUpdate));
      }else{
        await this.pacientesqliteService.updatePacienteParcialmente(id, pacienteUpdate);
      }
      console.log('Sucesso ao atualizar');

    }catch(error){
      console.error('Erro ao atualizar ', error);
      throw new Error('Erro ao atualizar ');
    }
  }

  // Buscar paciente por id no Mysql ou Sqlite
  public async getPacienteById(id:number): Promise<Paciente | null> {
    let paciente = null;
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        paciente = await firstValueFrom(this.pacienteMysqlService.getPacienteByID(id));
        if(paciente){
          return paciente;
        }
      }
      paciente = await this.pacientesqliteService.getPacienteById(id);
      return paciente;


    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  public async getPacienteByEmail(email: string): Promise<Paciente | null> {
    let paciente = null;
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        paciente = await firstValueFrom(this.pacienteMysqlService.getPacienteByEmail(email));
        if(paciente){
          return paciente;
        }

      }
      //paciente = await this.pacientesqliteService.getPacienteByEmail(email);
      return paciente;

    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  // Buscar paciente por CPF no Mysql ou Sqlite
  public async getPacienteByCPF(cpf: string): Promise<Paciente | null> {
    let paciente = null;
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        paciente = await firstValueFrom(this.pacienteMysqlService.getPacienteByCPF(cpf));
        if(paciente){
          return paciente;
        }
      }
      //paciente = await this.pacientesqliteService.getPacienteByCPF(cpf);
      return paciente;

    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  private verificaStatusMysql(): Promise<boolean> {
    return firstValueFrom(this.pacienteMysqlService.verificarConexaoMysql());
  }
}
