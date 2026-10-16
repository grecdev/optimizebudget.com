import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CategoryType } from '@shared/models/enums';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { ExpenseItemKey } from '../../tracker-table/tracker-table.model';

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
  public ExpenseItemKey = ExpenseItemKey;

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

  public addExpenseForm = new FormGroup({
    [ExpenseItemKey.NAME]: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    [ExpenseItemKey.VENDOR_NAME]: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    [ExpenseItemKey.CATEGORY]: new FormControl('', {
      validators: [Validators.required],
    }),
    [ExpenseItemKey.TOTAL]: new FormControl(0, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  constructor() {
    this._formatCategoriesObject();
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

  /**
   * @summary - Submit request functionality.
   *
   * @public
   * @returns {void}
   */
  public handleSubmit(): void {}
}
