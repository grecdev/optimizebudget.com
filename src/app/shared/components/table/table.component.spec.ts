import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTableComponent } from './table.component';

describe('AppTableComponent', () => {
  let component: AppTableComponent;
  let fixture: ComponentFixture<AppTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppTableComponent],
    });
    fixture = TestBed.createComponent(AppTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
