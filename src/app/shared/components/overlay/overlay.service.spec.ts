import { TestBed } from '@angular/core/testing';

import { AppOverlayService } from './overlay.service';

describe('AppOverlayService', () => {
  let service: AppOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
