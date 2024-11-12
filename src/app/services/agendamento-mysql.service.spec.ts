import { TestBed } from '@angular/core/testing';

import { AgendamentoMysqlService } from './agendamento-mysql.service';

describe('AgendamentoMysqlService', () => {
  let service: AgendamentoMysqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentoMysqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
