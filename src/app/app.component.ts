import { Component } from '@angular/core';

import { DatabaseSqliteService } from './services/database-sqlite.service';
import { PacienteSqliteService } from './services/paciente-sqlite.service';
import { AgendamentoSqliteService } from './services/agendamento-sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private databaseService: DatabaseSqliteService,
    private pacienteSqliteService: PacienteSqliteService,
    private agendamentoSqliteService: AgendamentoSqliteService

  ) {}

  async ngOnInit(): Promise<void> {
    // Cria o banco de dados
    await this.databaseService.createDatabase();

    await this.pacienteSqliteService.createTable();
    await this.agendamentoSqliteService.createTable();

  }
}
