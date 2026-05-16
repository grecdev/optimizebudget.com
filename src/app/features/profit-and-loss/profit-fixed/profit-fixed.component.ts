import { Component } from '@angular/core';

import { StatusType } from '../status-pill/status-pill.model';

@Component({
  selector: 'app-profit-fixed',
  templateUrl: './profit-fixed.component.html',
  styleUrls: ['./profit-fixed.component.scss'],
})
export class ProfitFixedComponent {
  protected readonly StatusType = StatusType;

  /**
   * @summary - Dynamically fetched.
   *
   * @tpye {number}
   *
   * @public
   */
  public totalProfit: number = 431;
}
