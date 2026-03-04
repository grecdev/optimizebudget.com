import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AppDialogService } from '@shared/components/dialog/dialog.service';

import {
  ADD_EXPENSE_DIALOG_BODY_REFERENCE,
  ExpenseDialogBodyModule,
} from './expense-dialog-body/expense-dialog-body.module';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseDialogComponent {
  private readonly _dialogService: AppDialogService;

  constructor(dialogService: AppDialogService) {
    this._dialogService = dialogService;
  }

  /**
   * @summary - Open dialog event, assigned to a button.
   *
   * @param {Event} event
   * @public
   * @returns {void}
   */
  public openDialogExpense(event: MouseEvent): void {
    event.stopPropagation();

    const CURRENT_TARGET = event.currentTarget as HTMLButtonElement;

    CURRENT_TARGET.blur();

    const OPTIONS = {
      title: 'Add expense',
      closeButton: true,
    };

    this._dialogService.open<
      ExpenseDialogBodyModule,
      typeof OPTIONS,
      typeof ADD_EXPENSE_DIALOG_BODY_REFERENCE
    >(ExpenseDialogBodyModule, OPTIONS, ADD_EXPENSE_DIALOG_BODY_REFERENCE);
  }
}
