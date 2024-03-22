import { TestBed } from '@angular/core/testing';

import { LoginStateServiceService } from './login-state-service';

describe('LoginStateServiceService', () => {
  let service: LoginStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
