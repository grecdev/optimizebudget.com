import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { type TotalCountCategoryComponent } from './total-count-category/total-count-category.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements AfterViewInit {
  @ViewChild('totalCountCategory')
  private readonly _totalCountCategory: TotalCountCategoryComponent | null = null;

  @ViewChild('rowElement') private readonly _rowElement: ElementRef<HTMLElement> | null =
    null;

  /**
   * @summary - Calculate the size of total expenses canvas graph, in order to set the sizes of other elements.
   *
   * @private
   * @returns {void}
   */
  private _calculateTotalExpensesGraphSize(): void {}

  /**
   * @summary - Set the container's height according to the canvas height.
   *
   * @private
   * @returns {void}
   */
  private _setHeightCanvas(): void {
    const NATIVE_ELEMENT_TOTAL_COUNT_CATEGORY =
      this._totalCountCategory &&
      this._totalCountCategory.appWidgetBox &&
      this._totalCountCategory.appWidgetBox.elementRef &&
      this._totalCountCategory.appWidgetBox.elementRef.nativeElement;

    const NATIVE_ELEMENT_ROW = this._rowElement && this._rowElement.nativeElement;

    if (!NATIVE_ELEMENT_TOTAL_COUNT_CATEGORY || !NATIVE_ELEMENT_ROW) {
      throw Error('Native element not found!');
    }

    const { height: HEIGHT_PX } =
      NATIVE_ELEMENT_TOTAL_COUNT_CATEGORY.getBoundingClientRect();

    Object.assign(NATIVE_ELEMENT_ROW.style, {
      gridTemplateRows: `${HEIGHT_PX}px`,
    });
  }

  ngAfterViewInit() {
    this._setHeightCanvas();
  }
}
