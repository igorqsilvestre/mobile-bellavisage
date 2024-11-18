import { TestBed } from '@angular/core/testing';

import { TratamentoService } from './tratamento.service';

describe('TratamentoService', () => {
  let service: TratamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TratamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
