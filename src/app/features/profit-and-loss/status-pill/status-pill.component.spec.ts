import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPillComponent } from './status-pill.component';

describe('StatusPillComponent', () => {
  let component: StatusPillComponent;
  let fixture: ComponentFixture<StatusPillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusPillComponent]
    });
    fixture = TestBed.createComponent(StatusPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
