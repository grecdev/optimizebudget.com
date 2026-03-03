import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'expense-dialog-body',
  templateUrl: './expense-dialog-body.component.html',
  styleUrls: ['./expense-dialog-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDialogBodyComponent {}
