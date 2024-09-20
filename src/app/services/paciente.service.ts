import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private databaseService: DatabaseService) {}

  public async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS paciente (
        id TEXT PRIMARY KEY,
        email TEXT,
        senha TEXT,
        nome TEXT,
        cpf TEXT,
        telefone TEXT,
        dataNascimento TEXT
      )`;
    await this.databaseService.executeSql(query);
    console.log('Tabela paciente criada');
  }

  public async addPaciente(paciente: Paciente): Promise<void> {
    const query = `INSERT INTO paciente (id, email, senha, nome, cpf, telefone, dataNascimento) VALUES (?, ?, ?, ?, ?)`;
    const formattedDate = paciente.dataNascimento instanceof Date ? paciente.dataNascimento.toISOString().split('T')[0] : paciente.dataNascimento;
    await this.databaseService.executeSql(query, [paciente.id, paciente.email, paciente.senha, paciente.nome, paciente.cpf, paciente.telefone, formattedDate]);
    console.log('Paciente adicionado');
  }

  public async getPacientes(): Promise<Paciente[]> {
    const query = 'SELECT * FROM paciente';
    const result = await this.databaseService.executeSql(query);
    const pacientes: Paciente[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      const paciente = new Paciente(row.id, row.email, row.senha, row.nome, row.cpf, row.telefone, row.dataNascimento);
      pacientes.push(paciente);
    }

    return pacientes;
  }

}
