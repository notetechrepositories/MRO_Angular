import { TestBed } from '@angular/core/testing';

import { Authguard2Guard } from './authguard2.guard';

describe('Authguard2Guard', () => {
  let guard: Authguard2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Authguard2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
