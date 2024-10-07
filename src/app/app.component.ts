import { AgendamentoRepository } from './repository/agendamento.repository';
import { Component } from '@angular/core';
import { PacienteRepository } from './repository/paciente.repository';

import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private databaseService: DatabaseService,
    private pacienteRepository: PacienteRepository,
    private agendamentoRepository: AgendamentoRepository

  ) {}

  async ngOnInit(): Promise<void> {
    // Cria o banco de dados
    await this.databaseService.createDatabase();

    await this.pacienteRepository.createTable();
    await this.agendamentoRepository.createTable();

  }
}
