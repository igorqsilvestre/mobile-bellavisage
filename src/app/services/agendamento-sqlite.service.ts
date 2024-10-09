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
      nomeTratamento TEXT,
      imagemTratamento TEXT,
      avaliacaoTratamento REAL,
      dataHorario TEXT,  -- Armazene no formato 'YYYY-MM-DD HH:MM:SS'
      nome TEXT,
      preco REAL -- Armazene como número decimal
    )`;

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      await this.databaseService.executeSql(query);
      console.log('Tabela agendamento criada no SQLite');
    } 
  }

  // Adicionar agendamento no SQLite 
  public async addAgendamento(agendamento: Agendamento): Promise<void> {

    // Chama a função toISOString() para obter a string da data no formato ISO
    const dataHorarioAjustado = agendamento.dataHorario.toISOString();

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `INSERT INTO agendamento (id, nomeTratamento, imagemTratamento, avaliacaoTratamento, dataHorario, preco) VALUES (?, ?, ?, ?, ?, ?)`;
      await this.databaseService.executeSql(query, [
        agendamento.id,
        agendamento.nomeTratamento,
        agendamento.imagemTratamento,
        agendamento.avaliacaoTratamento,
        dataHorarioAjustado, // Data no formato ISO
        agendamento.preco,
      ]);
      console.log('Agendamento adicionado no SQLite');
    }
  }


  public async getAllAgendamentos(): Promise<Agendamento[]> {
    // Verifica se o banco de dados é SQLite
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      // Buscar todos os registros no SQLite
      const result = await this.databaseService.executeSql('SELECT * FROM agendamento', []);
      // Cria um array para armazenar os agendamentos
      const agendamentos: Agendamento[] = [];
  
      if (!result || result.rows.length <= 0) {
        return [];
      } else {
        for (let i = 0; i < result.rows.length; i++) {
          const row = result.rows.item(i);
          const agendamento = new Agendamento(
            row.nomeTratamento,
            row.imagemTratamento,
            row.avaliacaoTratamento,
            new Date(row.dataHorario),
            row.preco,
            row.id
          );
          agendamentos.push(agendamento); // Adiciona ao novo array
        }
        return agendamentos;
      }
    }
    return [];
  }

  // Excluir agendamento no SQLite
  public async deleteAgendamento(id: number): Promise<void> {
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      // Consulta para excluir no SQLite
      const query = 'DELETE FROM agendamento WHERE id = ?';
      await this.databaseService.executeSql(query, [id]);
      console.log('Agendamento excluído do SQLite');
    } 
  }
}
