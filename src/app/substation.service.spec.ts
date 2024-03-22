import { TestBed } from '@angular/core/testing';

import { SubstationService } from './substation.service';

describe('SubstationService', () => {
  let service: SubstationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubstationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
