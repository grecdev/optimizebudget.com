import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StatusType } from '../status-pill/status-pill.model';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenueComponent {
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
  public totalRevenue: number = 2000;
}
