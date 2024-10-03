import { Component } from '@angular/core';
import { PacienteService } from './services/paciente.service';

import { DatabaseService } from './services/database.service';
import { AgendamentoService } from './services/agendamento.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private databaseService: DatabaseService,
    private pacienteService: PacienteService,
    private agendamentoService: AgendamentoService

  ) {}

  async ngOnInit(): Promise<void> {
    // Cria o banco de dados
    await this.databaseService.createDatabase();

    await this.pacienteService.createTable();
    await this.agendamentoService.createTable();

  }
}
