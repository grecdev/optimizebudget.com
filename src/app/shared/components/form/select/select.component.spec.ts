import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectComponent } from './select.component';

describe('AppSelectComponent', () => {
  let component: AppSelectComponent;
  let fixture: ComponentFixture<AppSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSelectComponent],
    });
    fixture = TestBed.createComponent(AppSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
