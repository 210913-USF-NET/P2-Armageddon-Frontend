import { TestBed } from '@angular/core/testing';

import { ArmageddonApiService } from './armageddon-api.service';

describe('ArmageddonApiService', () => {
  let service: ArmageddonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmageddonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
