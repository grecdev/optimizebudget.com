import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profit-margins',
  templateUrl: './profit-margins.component.html',
  styleUrls: ['./profit-margins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfitMarginsComponent {
  /**
   * @summary - Dynamically fetched.
   *
   * @tpye {number}
   *
   * @public
   */
  public totalMargins: number = 4.1;

  public readonly statusSign = {
    up: '+',
    down: '-',
  };
}
