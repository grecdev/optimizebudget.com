import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitFixedComponent } from './profit-fixed.component';

describe('ProfitFixedComponent', () => {
  let component: ProfitFixedComponent;
  let fixture: ComponentFixture<ProfitFixedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitFixedComponent]
    });
    fixture = TestBed.createComponent(ProfitFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
