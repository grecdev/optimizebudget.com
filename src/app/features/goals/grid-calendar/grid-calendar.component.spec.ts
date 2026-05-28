import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCalendarComponent } from './grid-calendar.component';

describe('GridCalendarComponent', () => {
  let component: GridCalendarComponent;
  let fixture: ComponentFixture<GridCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridCalendarComponent]
    });
    fixture = TestBed.createComponent(GridCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
