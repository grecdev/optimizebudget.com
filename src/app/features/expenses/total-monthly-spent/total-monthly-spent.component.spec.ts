import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMonthlySpentComponent } from './total-monthly-spent.component';

describe('TotalMonthlySpentComponent', () => {
  let component: TotalMonthlySpentComponent;
  let fixture: ComponentFixture<TotalMonthlySpentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalMonthlySpentComponent],
    });
    fixture = TestBed.createComponent(TotalMonthlySpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
