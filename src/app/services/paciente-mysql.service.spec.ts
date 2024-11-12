import { TestBed } from '@angular/core/testing';

import { PacienteMysqlService } from './paciente-mysql.service';

describe('PacienteMysqlService', () => {
  let service: PacienteMysqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteMysqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
