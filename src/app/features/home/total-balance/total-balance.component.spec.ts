import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBalanceComponent } from './total-balance.component';

describe('TotalBalanceComponent', () => {
  let component: TotalBalanceComponent;
  let fixture: ComponentFixture<TotalBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalBalanceComponent]
    });
    fixture = TestBed.createComponent(TotalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
