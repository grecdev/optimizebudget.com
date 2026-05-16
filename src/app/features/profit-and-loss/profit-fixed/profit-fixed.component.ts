import { Component } from '@angular/core';

import { StatusType } from '../status-pill/status-pill.model';

@Component({
  selector: 'app-profit-fixed',
  templateUrl: './profit-fixed.component.html',
  styleUrls: ['./profit-fixed.component.scss'],
})
export class ProfitFixedComponent {
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
  public totalProfit: number = 431;
}
