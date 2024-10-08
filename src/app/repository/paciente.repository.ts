import { Injectable } from '@angular/core';
import { PacienteSqliteService } from '../services/paciente-sqlite.service';
import { PacienteMysqlService } from '../services/paciente-mysql.service';
import { Paciente } from '../models/paciente';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PacienteRepository {
  constructor(
    private pacientesqliteService: PacienteSqliteService,
    private pacientemysqlService: PacienteMysqlService
  ) {}

  // Adicionar paciente no Mysql ou Sqlite
  public async addPaciente(paciente: Paciente): Promise<void> {
    try {
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        // Adiciona no MySQL via API
        await firstValueFrom(this.pacientemysqlService.addPaciente(paciente));
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

  // Atualizar senha do paciente no Mysql ou Sqlite
  public async updatePacienteSenha(paciente: Paciente, senha: string) : Promise<void>{
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        await firstValueFrom(this.pacientemysqlService.atualizaPacienteBySenha(senha, paciente));
      }else{
        await this.pacientesqliteService.updatePacienteSenha(paciente.id as number, senha);
      }
      console.log('Sucesso ao atualizar senha');

    }catch(error){
      console.error('Erro ao atualizar senha', error);
      throw new Error('Erro ao atualizar senha');
    }


  }

  // Buscar paciente por email e senha no Mysql ou Sqlite
  public async getPacienteByEmailAndSenha(email: string, senha: string): Promise<any> {
    let paciente = null;
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        paciente = await firstValueFrom(this.pacientemysqlService.getPacienteByEmailAndSenha(email, senha));
        if(paciente){
          return paciente;
        }
      }
      paciente = await this.pacientesqliteService.getPacienteByEmailAndSenha(email, senha);
      return paciente;


    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  // Buscar paciente por email no Mysql ou Sqlite
  public async getPacienteByEmail(email: string): Promise<any> {
    let paciente = null;
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        paciente = await firstValueFrom(this.pacientemysqlService.getPacienteByEmail(email));
        if(paciente){
          return paciente;
        }
      }
      paciente = await this.pacientesqliteService.getPacienteByEmail(email);
      return paciente;

    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  // Buscar paciente por CPF no Mysql ou Sqlite
  public async getPacienteByCPF(cpf: string): Promise<any> {
    let paciente = null;
    try{
      const mysqlAtivo = await this.verificaStatusMysql(); // Verifica se o MySQL está ativo
      if(mysqlAtivo){
        paciente = await firstValueFrom(this.pacientemysqlService.getPacienteByCPF(cpf));
        if(paciente){
          return paciente;
        }
      }
      paciente = await this.pacientesqliteService.getPacienteByCPF(cpf);
      return paciente;

    }catch(error){
      console.error('Erro ao buscar paciente', error);
      throw new Error('Erro ao buscar paciente');
    }
  }

  private verificaStatusMysql(): Promise<boolean> {
    return firstValueFrom(this.pacientemysqlService.verificarConexaoMysql());
  }
}
