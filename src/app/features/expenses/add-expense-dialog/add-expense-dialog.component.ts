import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { AppDialogService } from '@shared/components/dialog/dialog.service';
import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

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
  private readonly _changeDetectorRef: ChangeDetectorRef;

  /**
   * @summary - Need overlay reference for cleanup.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  constructor(dialogService: AppDialogService, changeDetectorRef: ChangeDetectorRef) {
    this._dialogService = dialogService;
    this._changeDetectorRef = changeDetectorRef;
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

    this._overlayReference = this._dialogService.open<
      ExpenseDialogBodyModule,
      typeof ADD_EXPENSE_DIALOG_BODY_REFERENCE
    >(ExpenseDialogBodyModule, OPTIONS, ADD_EXPENSE_DIALOG_BODY_REFERENCE);

    this._initCloseSubscription();
  }

  /**
   * @summary - Proper unsubscribe.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(): void {
    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._overlayReference.closingOverlay$.subscribe({
      next: () => {
        this._changeDetectorRef.markForCheck();
        this._overlayReference = null;
      },
    });
  }
}
