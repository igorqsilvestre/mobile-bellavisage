import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteCompartilhadoService {

  private readonly sessionStorageKey = 'paciente';

  constructor() {}

  // Método para salvar o paciente no sessionStorage
  setPaciente(paciente: Paciente): void {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(paciente));
  }

  // Método para obter o paciente do sessionStorage
  getPaciente(): Paciente | null {
    const pacienteJson = sessionStorage.getItem(this.sessionStorageKey);
    return pacienteJson ? JSON.parse(pacienteJson) : null;
  }

  // Método para remover o paciente do sessionStorage
  clearPaciente(): void {
    sessionStorage.removeItem(this.sessionStorageKey);
  }
}
