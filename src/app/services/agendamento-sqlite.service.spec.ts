import { TestBed } from '@angular/core/testing';

import { AgendamentoSqliteService } from './agendamento-sqlite.service';

describe('AgendamentoSqliteService', () => {
  let service: AgendamentoSqliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentoSqliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
