import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingBudgetComponent } from './remaining-budget.component';

describe('RemainingBudgetComponent', () => {
  let component: RemainingBudgetComponent;
  let fixture: ComponentFixture<RemainingBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemainingBudgetComponent]
    });
    fixture = TestBed.createComponent(RemainingBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
