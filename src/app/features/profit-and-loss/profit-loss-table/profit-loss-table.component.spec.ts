import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossTableComponent } from './profit-loss-table.component';

describe('ProfitLossTableComponent', () => {
  let component: ProfitLossTableComponent;
  let fixture: ComponentFixture<ProfitLossTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitLossTableComponent],
    });
    fixture = TestBed.createComponent(ProfitLossTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
