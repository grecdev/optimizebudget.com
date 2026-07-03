import { TestBed } from '@angular/core/testing';

import { CanActivateAuthenticationGuard } from './can-activate-authentication.guard';

describe('CanActivateAuthenticationGuard', () => {
  let guard: CanActivateAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
