import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesNotesComponent } from './expenses-notes.component';

describe('ExpensesNotesComponent', () => {
  let component: ExpensesNotesComponent;
  let fixture: ComponentFixture<ExpensesNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensesNotesComponent]
    });
    fixture = TestBed.createComponent(ExpensesNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
