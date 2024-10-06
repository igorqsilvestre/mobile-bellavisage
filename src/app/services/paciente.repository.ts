import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteRepository {

  constructor(private databaseService: DatabaseService) {}

  public async dropTable(): Promise<void> {
    const query = `DROP TABLE IF EXISTS paciente`;
    await this.databaseService.executeSql(query);
    console.log('Tabela paciente excluída');
  }

  // Criação de tabela no SQLite ou IndexedDB
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
    } else {
      await this.createIndexedDBStore();
      console.log('Store paciente criada no IndexedDB');
    }
  }

  // Criação de store no IndexedDB
  private async createIndexedDBStore(): Promise<void> {
    // IndexedDB já cria a store na inicialização, então este método pode não ser necessário,
    // mas pode ser usado para verificações adicionais, se necessário
    console.log('IndexedDB store já criada');
  }

  // Adicionar paciente no SQLite ou IndexedDB
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
      console.log('Paciente adicionado no SQLite');
    } else {
      const pacienteData = {
        id: paciente.id,
        email: paciente.email,
        senha: paciente.senha,
        nome: paciente.nome,
        cpf: paciente.cpf,
        telefone: paciente.telefone,
        dataNascimento: paciente.dataNascimento
      };
      await this.databaseService.executeSql('INSERT PACIENTE', [pacienteData]);
      console.log('Paciente adicionado no IndexedDB');
    }
  }

  // Atualizar senha do paciente no SQLite ou IndexedDB
  public async updatePacienteSenha(id: number, novaSenha: string): Promise<void> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `UPDATE paciente SET senha = ? WHERE id = ?`;
      await this.databaseService.executeSql(query, [novaSenha, id]);
      console.log('Senha atualizada no SQLite');
    } else {
      const pacientes = await this.getAllPacientes();
      const paciente = pacientes.find(p => p.id === id);
      if (paciente) {
        paciente.senha = novaSenha;
        await this.databaseService.executeSql('INSERT PACIENTE', [paciente]);
        console.log('Senha atualizada no IndexedDB');
      }
    }
  }

  // Buscar paciente por email e senha no SQLite ou IndexedDB
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
    } else {
      const pacientes = await this.getAllPacientes();
      return pacientes.find(p => p.email === email && p.senha === senha) || null;
    }
  }

  // Buscar paciente por email no SQLite ou IndexedDB
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
      const pacientes = await this.getAllPacientes();
      return pacientes.find(p => p.email === email) || null;
    }
  }

  // Buscar paciente por CPF no SQLite ou IndexedDB
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
      const pacientes = await this.getAllPacientes();
      return pacientes.find(p => p.cpf === cpf) || null;
    }
  }

  // Método auxiliar para mapear resultados de SQL para um objeto Paciente
  private mapRowToPaciente(row: any): Paciente {
    return new Paciente(
      row.id,
      row.email,
      row.senha,
      row.nome,
      row.cpf,
      row.telefone,
      row.dataNascimento
    );
  }

  // Buscar todos os pacientes no IndexedDB
  private async getAllPacientes(): Promise<Paciente[]> {
    const pacientes = await this.databaseService.executeSql('SELECT PACIENTE');
    return pacientes.map((pacienteData: any) => new Paciente(
      pacienteData.id,
      pacienteData.email,
      pacienteData.senha,
      pacienteData.nome,
      pacienteData.cpf,
      pacienteData.telefone,
      pacienteData.dataNascimento
    ));
  }


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
      const pacientes = await this.getAllPacientes();
      return pacientes.find(p => p.id === id) || null;
    }
  }

  async deleteAll() {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `DELETE FROM paciente`;
      await this.databaseService.executeSql(query);
    } else {
      //indexedDB
      await this.databaseService.executeSql('DELETE PACIENTE');
    }
  }

  async getPaciente() {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = 'SELECT * FROM paciente';
      const result = await this.databaseService.executeSql(query);
      if (result.rows.length > 0) {
        const row = result.rows.item(0);
        return this.mapRowToPaciente(row);
      } else {
        return null;
      }
    } else {
      const pacientes = await this.getAllPacientes();
      return pacientes[0] || null;
    }
  }
}
