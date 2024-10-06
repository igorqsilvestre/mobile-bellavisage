import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
// Importação para IndexedDB
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public dbInstance?: SQLiteObject | IDBPDatabase<any>;

  constructor(private sqlite: SQLite, private platform: Platform) {}

  // Método para inicializar o banco de dados correto
  public async createDatabase(): Promise<any> {
    await this.platform.ready();

    if (this.platform.is('hybrid')) {
      // Mobile (SQLite)
      return this.initSQLite();
    } else {
      // Web (IndexedDB)
      return this.initIndexedDB([
        //o correto seria criar isto no createTable, mas não encontramos uma maneira de fazer isso
        'PACIENTE',
        'AGENDAMENTO'
      ]);
    }
  }

  // Inicialização do SQLite (para dispositivos móveis)
  private async initSQLite(): Promise<any> {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydb2.db',
        location: 'default',
      });
      console.log('Banco de dados SQLite criado');
      return this.dbInstance;
    } catch (error) {
      console.error('Erro ao criar banco de dados SQLite', error);
      return null;
    }
  }

  // Inicialização do IndexedDB (para navegadores)
  private async initIndexedDB(
    tables: string[]
  ): Promise<any> {
    try {
      this.dbInstance = await openDB('mydb2', 1, {
        upgrade(db) {
          for(const table of tables) {
            // Criar uma store no IndexedDB (equivalente a uma tabela no SQLite)
            if (!db.objectStoreNames.contains(table)) {
              db.createObjectStore(table, { keyPath: 'id', autoIncrement: true });
            }
        }
        }
      });
      console.log('Banco de dados IndexedDB criado');
      return this.dbInstance;
    } catch (error) {
      console.error('Erro ao criar banco de dados IndexedDB', error);
      return null;
    }
  }

  // Método genérico para executar comandos SQL (SQLite) ou IndexedDB
  public async executeSql(query: string, params: any[] = []): Promise<any> {
    if (!this.dbInstance) {
      console.error('Banco de dados não inicializado');
      throw new Error('Banco de dados não inicializado');
    }

    // Executar a lógica de acordo com a plataforma
    if (this.isSQLite(this.dbInstance)) {
      return this.executeSQLite(query, params);
    } else {
      return this.executeIndexedDB(query.split(' ')[1], query.split(' ')[0], params);
    }
  }

  // Type guard para verificar se é SQLiteObject
  public  isSQLite(db: SQLiteObject | IDBPDatabase<any> | undefined): db is SQLiteObject {
    return !!(db as SQLiteObject)?.executeSql;
  }

  // Método para executar SQL no SQLite
  private async executeSQLite(query: string, params: any[] = []): Promise<any> {
    try {
      return await (this.dbInstance as SQLiteObject).executeSql(query, params);
    } catch (error) {
      console.error('Erro ao executar SQL no SQLite', error);
      throw error;
    }
  }

  // Método para operações no IndexedDB
  private async executeIndexedDB(table: string, operation: string, params: any[] = []): Promise<any> {
    try {
      const tx = (this.dbInstance as IDBPDatabase<any>).transaction(table, 'readwrite');
      const store = tx.objectStore(table);

      // Exemplo de operação de IndexedDB (inserir ou selecionar dados)
      if (operation === 'INSERT') {
        return await store.add(params[0]);  // Adicionando um item
      } else if (operation === 'SELECT') {
        return await store.getAll();  // Buscando todos os itens
      } else if (operation === 'DELETE') {

      if(params?.length) {
        return await store.delete(params[0]);  // Deletando um item
      } else {
        const data = await store.getAll();
        for (const item of data) {
          await store.delete(item.id);  // Deletando todos os itens
        }
      }
    }

      await tx.done;
    } catch (error) {
      console.error('Erro ao executar operação no IndexedDB', error);
      throw error;
    }
  }

}
