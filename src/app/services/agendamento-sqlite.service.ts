import { Injectable } from '@angular/core';
import { DatabaseSqliteService } from './database-sqlite.service';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoSqliteService {

  constructor(private databaseService: DatabaseSqliteService) {}

  // Criação de tabela no SQLite
  public async createTable(): Promise<void> {
    const query = `
    CREATE TABLE IF NOT EXISTS agendamento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nomeTratamento TEXT NOT NULL,
      imagemTratamento TEXT NOT NULL,
      avaliacaoTratamento REAL NOT NULL,
      dataHorario TEXT NOT NULL,
      preco REAL NOT NULL,
      pacienteId INTEGER NOT NULL,
      FOREIGN KEY (pacienteId) REFERENCES pacientes (id) ON DELETE CASCADE
    )`;

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      await this.databaseService.executeSql(query);
      console.log('Tabela agendamento criada no SQLite');
    }
  }

  /*
  // Adicionar agendamento no SQLite
  public async addAgendamento(agendamento: Agendamento): Promise<void> {

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `INSERT INTO agendamento (nomeTratamento, imagemTratamento, avaliacaoTratamento,
      dataHorario, preco, pacienteId) VALUES (?, ?, ?, ?, ?, ?)`;
      await this.databaseService.executeSql(query, [
        agendamento.nomeTratamento,
        agendamento.imagemTratamento,
        agendamento.avaliacaoTratamento,
        agendamento.dataHorario.toISOString(),
        agendamento.preco,
        agendamento.paciente.id
      ]);
      console.log('Agendamento adicionado no SQLite');
    }
  }
  */


  public async getAllAgendamentosByPacienteId(pacienteId:number): Promise<Agendamento[]> {
    // Verifica se o banco de dados é SQLite
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `SELECT * FROM agendamento WHERE pacienteId = ?`;
      const result = await this.databaseService.executeSql(query, [pacienteId]);
      const agendamentos: Agendamento[] = []

      if (!result || result.rows.length <= 0) {
        return [];
      } else {
        for (let i = 0; i < result.rows.length; i++) {
          const row = result.rows.item(i);
          const agendamento = new Agendamento(
            row.nomeTratamento,
            row.imagemTratamento,
            row.avaliacaoTratamento,
            new Date(row.dataHorario), // Converter string de volta para Date
            row.preco,
            row.pacienteId,
            row.id // Pode ser undefined, caso o ID não seja especificado
          );
          agendamentos.push(agendamento); // Adiciona ao novo array
        }
        return agendamentos;
      }
    }
    return [];
  }

  // Excluir agendamento no SQLite
  public async deleteAgendamentoByPacienteId(id: number, pacienteId: number): Promise<void> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      // Consulta para excluir no SQLite
      const query = 'DELETE FROM agendamento WHERE id = ? AND pacienteId = ?';
      await this.databaseService.executeSql(query, [id, pacienteId]);
      console.log('Agendamento excluído do SQLite');
    }
  }
}
