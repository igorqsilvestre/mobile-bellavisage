import { TestBed } from '@angular/core/testing';

import { TratamentoMysqlService } from './tratamento-mysql.service';

describe('TratamentoMysqlService', () => {
  let service: TratamentoMysqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamentoMysqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
