import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private databaseService: DatabaseService) {}

  public async dropTable(): Promise<void> {
    const query = `DROP TABLE IF EXISTS agendamento`;
    await this.databaseService.executeSql(query);
    console.log('Tabela agendamento excluída');
  }

  // Criação de tabela no SQLite ou IndexedDB
  public async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS agendamento (
        id TEXT PRIMARY KEY,
        nomeTratamento TEXT,
        imagemTratamento TEXT,
        avaliacaoTratamento REAL
        dataHorario TEXT,  -- Armazene no formato 'YYYY-MM-DD HH:MM:SS'
        nome TEXT,
        preco REAL -- Armazene como número decimal
      )`;

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      await this.databaseService.executeSql(query);
      console.log('Tabela agendamento criada no SQLite');
    } else {
      await this.createIndexedDBStore();
      console.log('Store agendamento criada no IndexedDB');
    }
  }

  // Criação de store no IndexedDB
  private async createIndexedDBStore(): Promise<void> {
    // IndexedDB já cria a store na inicialização, então este método pode não ser necessário,
    // mas pode ser usado para verificações adicionais, se necessário
    console.log('IndexedDB store já criada');
  }

  // Adicionar agendamento no SQLite ou IndexedDB
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
  } else {
    const agendamentoData = {
      id: agendamento.id,
      nomeTratamento: agendamento.nomeTratamento,
      imagemTratamento: agendamento.imagemTratamento,
      avaliacaoTratamento: agendamento.avaliacaoTratamento,
      dataHorario: dataHorarioAjustado, // Data no formato ISO
      preco: agendamento.preco,
    };
    await this.databaseService.executeSql('INSERT', [agendamentoData]);
    console.log('Agendamento adicionado no IndexedDB');
  }
  }


  // Buscar todos os agendamentos no SQLite ou IndexedDB
  public async getAllAgendamentos(): Promise<Agendamento[]> {
    let agendamentosData: any[] = [];

    // Verifica se o banco de dados é SQLite ou IndexedDB
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      // Buscar todos os registros no SQLite
      agendamentosData = await this.databaseService.executeSql('SELECT * FROM agendamento');
    } else {
      // Buscar todos os registros no IndexedDB
      agendamentosData = await this.databaseService.executeSql('SELECT');
    }

    // Verificar se há dados para mapear
    if (!agendamentosData || agendamentosData.length === 0) {
      return []; // Retorna um array vazio se não houver dados
    }

    // Converter os dados do banco para instâncias da classe Agendamento
    return agendamentosData.map((agendamentoData: any) => {
      return new Agendamento(
        agendamentoData.id,
        agendamentoData.nomeTratamento,
        agendamentoData.imagemTratamento,
        agendamentoData.avaliacaoTratamento,
        new Date(agendamentoData.dataHorario),
        agendamentoData.preco
      );
    });
  }

}
