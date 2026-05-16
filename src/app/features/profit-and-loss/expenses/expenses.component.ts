import { Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
  /**
   * @summary - Dynamically fetched.
   *
   * @tpye {number}
   *
   * @public
   */
  public totalExpenses: number = 1569;

  public statusSign = {
    up: '+',
    down: '-',
  };
}
