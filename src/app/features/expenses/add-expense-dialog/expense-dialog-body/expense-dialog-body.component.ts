import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

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

  public closeExpenseDialog(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.close();
  }
}
