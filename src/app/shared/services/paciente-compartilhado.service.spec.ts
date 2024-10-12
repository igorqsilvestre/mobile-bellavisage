import { TestBed } from '@angular/core/testing';

import { PacienteCompartilhadoService } from './paciente-compartilhado.service';

describe('PacienteCompartilhadoService', () => {
  let service: PacienteCompartilhadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteCompartilhadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
