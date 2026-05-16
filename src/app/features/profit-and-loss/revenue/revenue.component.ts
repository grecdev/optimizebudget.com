import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenueComponent {
  /**
   * @summary - Dynamically fetched.
   *
   * @tpye {number}
   *
   * @public
   */
  public totalRevenue: number = 1234;

  public statusSign = {
    up: '+',
    down: '-',
  };
}
