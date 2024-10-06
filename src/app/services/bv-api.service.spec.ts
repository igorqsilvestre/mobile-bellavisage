import { TestBed } from '@angular/core/testing';

import { BvApiService } from './bv-api.service';

describe('BvApiService', () => {
  let service: BvApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BvApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
