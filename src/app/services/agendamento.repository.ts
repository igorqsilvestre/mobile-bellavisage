
import { Agendamento } from './../models/agendamento';
import { BvApiService } from './bv-api.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

export class AgendamentoRepository {
  // Adicionar agendamento no SQLite ou IndexedDB


constructor(
  private databaseService: DatabaseService) {}

// Criação de tabela no SQLite ou IndexedDB
public async createTable(): Promise<void> {
  const query = `
  CREATE TABLE IF NOT EXISTS agendamento (
    id INT PRIMARY KEY,
    nomeTratamento TEXT,
    imagemTratamento TEXT,
    avaliacaoTratamento REAL,
    dataHorario TEXT,  -- Armazene no formato 'YYYY-MM-DD HH:MM:SS'
    nome TEXT,
    valor REAL, -- Armazene como número decimal
    paciente INT
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
  createIndexedDBStore() {
    // IndexedDB já cria a store na inicialização, então este método pode não ser necessário,
    // mas pode ser usado para verificações adicionais, se necessário
    console.log('IndexedDB store já criada');

  }


  // Adicionar agendamento no SQLite ou IndexedDB
  public async addAgendamento(agendamento: Agendamento): Promise<void> {

    // Chama a função toISOString() para obter a string da data no formato ISO
    const dataHorarioAjustado = agendamento.dataHorario.toISOString();

    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      const query = `INSERT INTO agendamento (id, nomeTratamento, imagemTratamento, avaliacaoTratamento, dataHorario, valor, paciente) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await this.databaseService.executeSql(query, [
        agendamento.id,
        agendamento.nomeTratamento,
        agendamento.imagemTratamento,
        agendamento.avaliacaoTratamento,
        dataHorarioAjustado, // Data no formato ISO
        agendamento.valor,
        agendamento.paciente
      ]);
      console.log('Agendamento adicionado no SQLite');
    } else {
      const agendamentoData = {
        id: agendamento.id,
        nomeTratamento: agendamento.nomeTratamento,
        imagemTratamento: agendamento.imagemTratamento,
        avaliacaoTratamento: agendamento.avaliacaoTratamento,
        dataHorario: dataHorarioAjustado, // Data no formato ISO
        valor: agendamento.valor,
        paciente: agendamento.paciente
      };
      await this.databaseService.executeSql('INSERT AGENDAMENTO', [agendamentoData]);
      console.log('Agendamento adicionado no IndexedDB');
    }
  }

  public async getAllAgendamentos(): Promise<Agendamento[]> {

    // Verifica se o banco de dados é SQLite ou IndexedDB
    if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
      // Buscar todos os registros no SQLite
      const result = await this.databaseService.executeSql('SELECT * FROM agendamento',[]);
      // Cria um array para armazenar os agendamentos
      const agendamentos: Agendamento[] = [];

      if(result.rows.lenght <= 0 || !result){
        return [];
      }else{
        for (let i = 0; i < result.rows.length; i++) {
          const row = result.rows.item(i);
          const agendamento = new Agendamento(
            row.id,
            row.nomeTratamento,
            row.imagemTratamento,
            row.avaliacaoTratamento,
            new Date(row.dataHorario),
            row.valor,
            row.tratamento,
            row.paciente
          );
          agendamentos.push(agendamento); // Adiciona ao novo array
        }
        return agendamentos;
      }
    } else {
      let agendamentosData: any[] = [];
      // Buscar todos os registros no IndexedDB
      agendamentosData = await this.databaseService.executeSql('SELECT AGENDAMENTO');

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
          agendamentoData.valor,
          agendamentoData.tratamento,
          agendamentoData.paciente
        );
      });
    }
  }

    //Metodo para atualizar o agendamento


    //Metodo para deletar o agendamento
    public async deleteAgendamento(id: number): Promise<void> {
      if (this.databaseService.isSQLite(this.databaseService.dbInstance)) {
        const query = `DELETE FROM agendamento WHERE id = ?`;
        await this.databaseService.executeSql(query, [id]);
        console.log('Agendamento deletado no SQLite');
      } else {
        await this.databaseService.executeSql('DELETE AGENDAMENTO', [id]);
        console.log('Agendamento deletado no IndexedDB');
      }

    }
  }




