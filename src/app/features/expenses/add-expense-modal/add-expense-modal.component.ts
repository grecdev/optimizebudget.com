import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DialogService } from '@shared/components/dialog/dialog.service';

import { ModalBodyComponent } from './modal-body/modal-body.component';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpenseModalComponent {
  private readonly _dialogService: DialogService<ModalBodyComponent>;

  constructor(dialogService: DialogService<ModalBodyComponent>) {
    this._dialogService = dialogService;
  }

  /**
   * @summary - Open modal event, assigned to a button.
   *
   * @param {Event} event
   * @public
   * @returns {void}
   */
  public openModalExpense(event: Event): void {
    event.stopPropagation();

    this._dialogService.open(ModalBodyComponent, {
      title: 'Add expense',
      closeButton: true,
    });
  }
}
