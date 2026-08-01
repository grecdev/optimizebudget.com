import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSnackbarComponent } from './snackbar.component';

describe('AppSnackbarComponent', () => {
  let component: AppSnackbarComponent;
  let fixture: ComponentFixture<AppSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppSnackbarComponent],
    });
    fixture = TestBed.createComponent(AppSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
