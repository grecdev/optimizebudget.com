import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectOptionComponent } from './select-option.component';

describe('AppSelectOptionComponent', () => {
  let component: AppSelectOptionComponent;
  let fixture: ComponentFixture<AppSelectOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSelectOptionComponent],
    });
    fixture = TestBed.createComponent(AppSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
