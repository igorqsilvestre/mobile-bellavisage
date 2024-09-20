import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public dbInstance?: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {}

  public async createDatabase(): Promise<any> {
    try {
      await this.platform.ready();
      this.dbInstance = await this.sqlite.create({
        name: 'mydb.db',
        location: 'default',
      });
      console.log('Banco de dados criado');
      return this.dbInstance;
    } catch (error) {
      console.error('Erro ao criar banco de dados', error);
      return null;
    }
  }

  public async executeSql(query: string, params: any[] = []): Promise<any> {
    try {
      return await this.dbInstance?.executeSql(query, params);
    } catch (error) {
      console.error('Erro ao executar SQL', error);
      throw error;
    }
  }

}
