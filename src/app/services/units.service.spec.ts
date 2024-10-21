import { TestBed } from '@angular/core/testing';

import { UnitsServiceService } from 'app/services/units.service';

describe('UnitsServiceService', () => {
  let service: UnitsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
