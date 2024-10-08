import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

import { Platform } from '@ionic/angular';
// Importação para IndexedDB
import {IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSqliteService {

  public dbInstance?: SQLiteObject | IDBPDatabase<any>;

  constructor(private sqlite: SQLite, private platform: Platform) {}

  // Método para inicializar o banco de dados correto
  public async createDatabase(): Promise<any> {
    await this.platform.ready();

    if (this.platform.is('hybrid')) {
      // Mobile (SQLite)
      return this.initSQLite();
    }
  }

  // Inicialização do SQLite (para dispositivos móveis)
  private async initSQLite(): Promise<any> {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydb.db',
        location: 'default',
      });
      console.log('Banco de dados SQLite criado');
      return this.dbInstance;
    } catch (error) {
      console.error('Erro ao criar banco de dados SQLite', error);
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

}
