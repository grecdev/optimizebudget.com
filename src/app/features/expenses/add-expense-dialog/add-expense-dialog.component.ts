import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DialogService } from '@shared/components/dialog/dialog.service';

import {
  ADD_EXPENSE_DIALOG_BODY_REFERENCE,
  DialogBodyModule,
} from './dialog-body/dialog-body.module';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseDialogComponent {
  private readonly _dialogService: DialogService<
    DialogBodyModule,
    typeof ADD_EXPENSE_DIALOG_BODY_REFERENCE
  >;

  constructor(
    dialogService: DialogService<
      DialogBodyModule,
      typeof ADD_EXPENSE_DIALOG_BODY_REFERENCE
    >
  ) {
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

    this._dialogService.open(
      DialogBodyModule,
      OPTIONS,
      ADD_EXPENSE_DIALOG_BODY_REFERENCE
    );
  }
}
