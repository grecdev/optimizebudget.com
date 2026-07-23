import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRequirementContainerComponent } from './password-requirement-container.component';

describe('PasswordRequirementContainerComponent', () => {
  let component: PasswordRequirementContainerComponent;
  let fixture: ComponentFixture<PasswordRequirementContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRequirementContainerComponent]
    });
    fixture = TestBed.createComponent(PasswordRequirementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
