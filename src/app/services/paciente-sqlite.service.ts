import { Injectable } from '@angular/core';
import { DatabaseSqliteService } from './database-sqlite.service';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteSqliteService {

  constructor(private databaseService: DatabaseSqliteService) {}

  public async dropTable(): Promise<void> {
    const query = `DROP TABLE IF EXISTS paciente`;
    await this.databaseService.executeSql(query);
    console.log('Tabela paciente excluída');
  }

  // Criação de tabela no SQLite
  public async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS paciente (
        id INT PRIMARY KEY,
        email TEXT,
        senha TEXT,
        nome TEXT,
        cpf TEXT,
        telefone TEXT,
        dataNascimento TEXT
      )`;

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      await this.databaseService.executeSql(query);
      console.log('Tabela paciente criada no SQLite');
    }
  }

  // Adicionar paciente no SQLite
  public async addPaciente(paciente: Paciente): Promise<void> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `INSERT INTO paciente (id, email, senha, nome, cpf, telefone, dataNascimento) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await this.databaseService.executeSql(query, [
        paciente.id,
        paciente.email,
        paciente.senha,
        paciente.nome,
        paciente.cpf,
        paciente.telefone,
        paciente.dataNascimento
      ]);
    }
  }

  // Atualizar senha do paciente no SQLite
  public async updatePacienteSenha(id: number, novaSenha: string): Promise<void> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `UPDATE paciente SET senha = ? WHERE id = ?`;
      await this.databaseService.executeSql(query, [novaSenha, id]);
    }
  }

  // Buscar paciente por email e senha no SQLite
  public async getPacienteByEmailAndSenha(email: string, senha: string): Promise<Paciente | null> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = 'SELECT * FROM paciente WHERE email = ? AND senha = ?';
      const result = await this.databaseService.executeSql(query, [email, senha]);
      if (result.rows.length > 0) {
        const row = result.rows.item(0);
        return this.mapRowToPaciente(row);
      } else {
        return null;
      }
    }else{
      return null
    }
  }

  // Buscar paciente por email no SQLite
  public async getPacienteByEmail(email: string): Promise<Paciente | null> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = 'SELECT * FROM paciente WHERE email = ?';
      const result = await this.databaseService.executeSql(query, [email]);
      if (result.rows.length > 0) {
        const row = result.rows.item(0);
        return this.mapRowToPaciente(row);
      } else {
        return null;
      }
    } else {
     return null;
    }
  }

  // Buscar paciente por CPF no SQLite
  public async getPacienteByCPF(cpf: string): Promise<Paciente | null> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = 'SELECT * FROM paciente WHERE cpf = ?';
      const result = await this.databaseService.executeSql(query, [cpf]);
      if (result.rows.length > 0) {
        const row = result.rows.item(0);
        return this.mapRowToPaciente(row);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  // Método auxiliar para mapear resultados de SQL para um objeto Paciente
  private mapRowToPaciente(row: any): Paciente {
    return new Paciente(
      row.email,
      row.senha,
      row.nome,
      row.cpf,
      row.telefone,
      row.dataNascimento,
      row.id  // Adicionando o id aqui
    );
  }

}
