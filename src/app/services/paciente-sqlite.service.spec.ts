/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PacienteSqliteService } from './paciente-sqlite.service';

describe('Service: PacienteSqlite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacienteSqliteService]
    });
  });

  it('should ...', inject([PacienteSqliteService], (service: PacienteSqliteService) => {
    expect(service).toBeTruthy();
  }));
});
