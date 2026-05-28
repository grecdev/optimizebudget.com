import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StatusType } from '../status-pill/status-pill.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss', '../profit-and-loss-utility.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  /**
   * @summary - Status type used for the "pill" component.
   *
   * @type {StatusType}
   *
   * @public
   * @readonly
   */
  public readonly StatusType = StatusType;

  /**
   * @summary - Dynamically fetched.
   *
   * @tpye {number}
   *
   * @public
   */
  public totalExpenses: number = 1569;
}
