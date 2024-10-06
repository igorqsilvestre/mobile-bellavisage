import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';
import { DatabaseService } from './database.service';
import { PacienteRepository } from './paciente.repository';
import { BvApiService } from './bv-api.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(
    private pacienteRepository: PacienteRepository,
    private bvApiService: BvApiService
  ) {}

  // Adicionar paciente no SQLite ou IndexedDB
  public async addPaciente(paciente: Paciente): Promise<void> {

    paciente.cpf = paciente.cpf.replace(/\D/g, '');
    paciente.telefone = paciente.telefone.replace(/\D/g, '');

    const newPaciente = await this.bvApiService.addPaciente(paciente);
    paciente.id = newPaciente.id;

    return await this.pacienteRepository.addPaciente(paciente);
  }

  // Atualizar senha do paciente no SQLite ou IndexedDB
  public async updatePacienteSenha(id: number, novaSenha: string): Promise<void> {
    return await this.pacienteRepository.updatePacienteSenha(id, novaSenha);
  }

  //metodo de login
  // Buscar paciente por email e senha no SQLite ou IndexedDB
  public async getPacienteByEmailAndSenha(email: string, senha: string): Promise<Paciente | null> {
    const paciente = await this.bvApiService.getPacienteByEmailAndSenha(email, senha);
    if(!paciente) {
      const pacienteDoRepositorio = await this.pacienteRepository.getPacienteByEmailAndSenha(email, senha);
      return pacienteDoRepositorio;
    } else {
      await this.pacienteRepository.deleteAll();
      await this.pacienteRepository.addPaciente(paciente);
      return paciente;
    }
  }

  // Buscar paciente por email no SQLite ou IndexedDB
  public async getPacienteByEmail(email: string): Promise<Paciente | null> {
    const paciente = await this.bvApiService.getPacienteByEmail(email);
    if (!paciente) {
      return await this.pacienteRepository.getPacienteByEmail(email);
    } else {
      const databasePaciente = await this.pacienteRepository.getPacienteById(paciente.id);
      if (!databasePaciente) {
        await this.pacienteRepository.addPaciente(paciente);
      }
      return paciente;
    }
  }

  // Buscar paciente por CPF no SQLite ou IndexedDB
  public async getPacienteByCPF(cpf: string): Promise<Paciente | null> {
    const paciente = await this.bvApiService.getPacienteByCPF(cpf);
    if (!paciente) {
      return await this.pacienteRepository.getPacienteByCPF(cpf);
    } else {
      const databasePaciente = await this.getPacienteById(paciente.id);
      if (!databasePaciente) {
        await this.pacienteRepository.addPaciente(paciente);
      }
      return paciente;
    }
  }

  public async getPacienteById(id: number): Promise<Paciente | null> {
    return await this.pacienteRepository.getPacienteById(id);
  }

  public async getPacienteLogado(): Promise<Paciente | null> {
    return await this.pacienteRepository.getPaciente();
  }
}
