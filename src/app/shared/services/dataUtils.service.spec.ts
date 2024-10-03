/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataUtilsService } from './dataUtils.service';

describe('Service: DataUtils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataUtilsService]
    });
  });

  it('should ...', inject([DataUtilsService], (service: DataUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
