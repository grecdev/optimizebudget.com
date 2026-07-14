import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSuccessRegisterComponent } from './success-register.component';

describe('AppSuccessRegisterComponent', () => {
  let component: AppSuccessRegisterComponent;
  let fixture: ComponentFixture<AppSuccessRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSuccessRegisterComponent],
    });
    fixture = TestBed.createComponent(AppSuccessRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
