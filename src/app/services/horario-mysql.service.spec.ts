import { TestBed } from '@angular/core/testing';

import { HorarioMysqlService } from './horario-mysql.service';

describe('HorarioMysqlService', () => {
  let service: HorarioMysqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioMysqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
