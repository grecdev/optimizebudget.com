import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DialogService } from '@shared/components/dialog/dialog.service';

import { DialogBodyComponent } from './dialog-body/dialog-body.component';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseDialogComponent {
  private readonly _dialogService: DialogService<DialogBodyComponent>;

  constructor(dialogService: DialogService<DialogBodyComponent>) {
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

    this._dialogService.open(DialogBodyComponent, {
      title: 'Add expense',
      closeButton: true,
    });
  }
}
