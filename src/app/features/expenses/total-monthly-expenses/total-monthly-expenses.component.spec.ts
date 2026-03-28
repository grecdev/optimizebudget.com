import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMonthlyExpensesComponent } from './total-monthly-expenses.component';

describe('TotalMonthlyExpensesComponent', () => {
  let component: TotalMonthlyExpensesComponent;
  let fixture: ComponentFixture<TotalMonthlyExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalMonthlyExpensesComponent]
    });
    fixture = TestBed.createComponent(TotalMonthlyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
