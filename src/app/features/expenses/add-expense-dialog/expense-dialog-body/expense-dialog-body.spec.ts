import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDialogBodyComponent } from './expense-dialog-body.component';

describe('DialogBodyComponent', () => {
  let component: ExpenseDialogBodyComponent;
  let fixture: ComponentFixture<ExpenseDialogBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseDialogBodyComponent],
    });
    fixture = TestBed.createComponent(ExpenseDialogBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
