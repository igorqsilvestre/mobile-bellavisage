import { Injectable } from '@angular/core';
import { DatabaseSqliteService } from './database-sqlite.service';
import { Paciente } from '../models/paciente';
import { PacienteUpdate } from '../models/paciente-update';

@Injectable({
  providedIn: 'root'
})
export class PacienteSqliteService {

  constructor(private databaseService: DatabaseSqliteService) {}

  // Criação de tabela no SQLite
  public async createTable(): Promise<void> {
    const query = `
    CREATE TABLE IF NOT EXISTS paciente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      senha TEXT,
      nome TEXT,
      cpf TEXT,
      telefone TEXT,
      dataNascimento TEXT,
      cep TEXT,
      numero TEXT,
      complemento TEXT,
      bairro TEXT,
      logradouro TEXT,
      cidade TEXT,
      estado TEXT
    )`;

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      await this.databaseService.executeSql(query);
      console.log('Tabela paciente criada no SQLite');
    }
  }

  // Adicionar paciente no SQLite
  public async addPaciente(paciente: Paciente): Promise<void> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `
        INSERT INTO paciente (email, senha, nome, cpf, telefone, dataNascimento, cep, numero, complemento, bairro, logradouro, cidade, estado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      await this.databaseService.executeSql(query, [
        paciente.email,
        paciente.senha,
        paciente.nome,
        paciente.cpf,
        paciente.telefone,
        paciente.dataNascimento.toISOString(),
        paciente.endereco.cep,
        paciente.endereco.numero || '',
        paciente.endereco.complemento || '',
        paciente.endereco.bairro,
        paciente.endereco.logradouro,
        paciente.endereco.cidade,
        paciente.endereco.estado
      ]);
    }
  }

  // Atualizar paciente no SQLite genérico
  public async updatePacienteParcialmente(id: number, pacienteUpdate: PacienteUpdate): Promise<boolean> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const updates: string[] = [];
      const params: any[] = [];

      if (pacienteUpdate.senha) {
        updates.push(`senha = ?`);
        params.push(pacienteUpdate.senha);
      }
      if (pacienteUpdate.email) {
        updates.push(`email = ?`);
        params.push(pacienteUpdate.email);
      }

      if (pacienteUpdate.telefone) {
        updates.push(`telefone = ?`);
        params.push(pacienteUpdate.telefone);
      }

      // Atualiza os campos do endereço
      if (pacienteUpdate.endereco) {
        const endereco = pacienteUpdate.endereco;
        if (endereco.cep) {
          updates.push(`cep = ?`);
          params.push(endereco.cep);
        }
        if (endereco.numero) {
          updates.push(`numero = ?`);
          params.push(endereco.numero);
        }
        if (endereco.complemento) {
          updates.push(`complemento = ?`);
          params.push(endereco.complemento);
        }
        if (endereco.bairro) {
          updates.push(`bairro = ?`);
          params.push(endereco.bairro);
        }
        if (endereco.logradouro) {
          updates.push(`logradouro = ?`);
          params.push(endereco.logradouro);
        }
        if (endereco.cidade) {
          updates.push(`cidade = ?`);
          params.push(endereco.cidade);
        }
        if (endereco.estado) {
          updates.push(`estado = ?`);
          params.push(endereco.estado);
        }
      }

      if (updates.length > 0) {
        const query = `UPDATE paciente SET ${updates.join(', ')} WHERE id = ?`;
        params.push(id);

        try {
          await this.databaseService.executeSql(query, params);
          return true; // Atualização bem-sucedida
        } catch (error) {
          console.error('Erro ao atualizar paciente:', error);
          return false; // Atualização falhou
        }
      }
    }
    return false; // Nenhuma atualização foi feita
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

  // Buscar paciente por id no SQLite
  public async getPacienteById(id: number): Promise<Paciente | null> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = 'SELECT * FROM paciente WHERE id = ?';
      const result = await this.databaseService.executeSql(query, [id]);
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

  private mapRowToPaciente(row: any): Paciente {
    return new Paciente(
      row.email,
      row.senha,
      row.nome,
      row.cpf,
      row.telefone,
      new Date(row.dataNascimento),  // Convertendo data para um objeto Date
      {
        cep: row.cep,
        numero: row.numero || '',         // Se número for opcional
        complemento: row.complemento || '', // Se complemento for opcional
        bairro: row.bairro,
        logradouro: row.logradouro,
        cidade: row.cidade,
        estado: row.estado
      },
      row.id // Incluindo o id do paciente
    );
  }

}
