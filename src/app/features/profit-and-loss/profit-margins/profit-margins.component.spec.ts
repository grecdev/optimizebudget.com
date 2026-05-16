import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitMarginsComponent } from './profit-margins.component';

describe('ProfitMarginsComponent', () => {
  let component: ProfitMarginsComponent;
  let fixture: ComponentFixture<ProfitMarginsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitMarginsComponent]
    });
    fixture = TestBed.createComponent(ProfitMarginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
