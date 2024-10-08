/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DatabaseSqliteService } from './database-sqlite.service';

describe('Service: Database', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseSqliteService]
    });
  });

  it('should ...', inject([DatabaseSqliteService], (service: DatabaseSqliteService) => {
    expect(service).toBeTruthy();
  }));
});
