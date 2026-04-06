import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingPaymentsComponent } from './incoming-payments.component';

describe('IncomingPaymentsComponent', () => {
  let component: IncomingPaymentsComponent;
  let fixture: ComponentFixture<IncomingPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingPaymentsComponent],
    });
    fixture = TestBed.createComponent(IncomingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
