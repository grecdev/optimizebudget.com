import { type EmbeddedViewRef, Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements AfterViewInit {
  @ViewChild('totalCountCategory')
  totalCountCategory: EmbeddedViewRef<HTMLElement> | null = null;

  /**
   * @summary - Calculate the size of total expenses canvas graph, in order to set the sizes of other elements.
   *
   * @private
   * @returns {void}
   */
  private _calculateTotalExpensesGraphSize(): void {}

  ngAfterViewInit() {
    console.log(this.totalCountCategory);
  }
}
