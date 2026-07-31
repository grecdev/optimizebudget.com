import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSuccessRequestComponent } from './success-request.component';

describe('AppSuccessRequestComponent', () => {
  let component: AppSuccessRequestComponent;
  let fixture: ComponentFixture<AppSuccessRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSuccessRequestComponent],
    });
    fixture = TestBed.createComponent(AppSuccessRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
