import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOverlayComponent } from './overlay.component';

describe('AppOverlayComponent', () => {
  let component: AppOverlayComponent;
  let fixture: ComponentFixture<AppOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppOverlayComponent],
    });
    fixture = TestBed.createComponent(AppOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
