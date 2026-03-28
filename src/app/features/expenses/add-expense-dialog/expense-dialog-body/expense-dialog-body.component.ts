import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CategoryType } from '@shared/models/enums';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import {
  type ExpenseCategoriesFormatted,
  type ExpenseCategoryItem,
} from './expense-dialog-body.model';

@Component({
  selector: 'expense-dialog-body',
  templateUrl: './expense-dialog-body.component.html',
  styleUrls: ['./expense-dialog-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDialogBodyComponent implements AppOverlayContentInstances {
  /**
   * @summary - Assigned from the OverlayService.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @public
   */
  public overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Category to set
   *
   * @type {ExpenseCategoriesFormatted}
   *
   * @public
   */
  public expenseCategories: ExpenseCategoriesFormatted = [];

  constructor() {
    this._formatCategoriesObject();
  }

  /**
   * @summary - Close expense dialog on custom button click.
   *
   * @param {MouseEvent} event - DOM Event
   *
   * @public
   * @returns {void}
   */
  public closeExpenseDialog(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.close();
  }

  /**
   * @summary - Create an array with key-value pair objects.
   *
   * @private
   * @returns {void}
   */
  private _formatCategoriesObject(): void {
    this.expenseCategories = Object.values(CategoryType).map(item => ({
      textContent: item,
      value: item.toLowerCase(),
    }));
  }

  /**
   * @summary - Track by function used for expense categories for loop.
   *
   * @param {number} _index - Not used.
   * @param {ExpenseCategoryItem} item - Array's item.
   *
   * @returns {string}
   * @public
   */
  public expenseCategoriesTrackByFn(_index: number, item: ExpenseCategoryItem): string {
    return item.value;
  }
}
