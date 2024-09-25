import { Component } from '@angular/core';
import { PacienteService } from './services/paciente.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private pacienteService: PacienteService, private databaseService: DatabaseService) {}

  async ngOnInit(): Promise<void> {
    // Cria o banco de dados
    await this.databaseService.createDatabase();

    // Cria a tabela de pacientes
    await this.pacienteService.createTable();

  }
}
