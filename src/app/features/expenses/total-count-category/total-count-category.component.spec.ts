import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCountCategoryComponent } from './total-count-category.component';

describe('TotalCountCategoryComponent', () => {
  let component: TotalCountCategoryComponent;
  let fixture: ComponentFixture<TotalCountCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCountCategoryComponent],
    });
    fixture = TestBed.createComponent(TotalCountCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
