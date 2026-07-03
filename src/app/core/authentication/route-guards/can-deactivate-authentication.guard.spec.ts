import { TestBed } from '@angular/core/testing';

import { CanDeactivateAuthenticationGuard } from './can-deactivate-authentication.guard';

describe('CanDeactivateAuthenticationGuard', () => {
  let guard: CanDeactivateAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeactivateAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
