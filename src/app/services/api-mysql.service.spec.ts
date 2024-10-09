/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiMysqlService } from './api-mysql.service';

describe('Service: ApiMysql', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMysqlService]
    });
  });

  it('should ...', inject([ApiMysqlService], (service: ApiMysqlService) => {
    expect(service).toBeTruthy();
  }));
});
