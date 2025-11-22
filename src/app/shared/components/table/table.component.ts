import { ChangeDetectionStrategy, ViewEncapsulation, Component, Inject } from '@angular/core';

import { HeaderRowOutlet } from '@shared/components/table/row.component';

import { _VIEW_REPEATER_STRATEGY, TABLE } from './tokens';

import { _ViewRepeaterStrategy } from './view-repeater-strategy';

import { type RenderRow, type RowContext } from './table.model';

@Component({
  selector: 'table[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TABLE,
      useExisting: TableComponent,
    },
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _ViewRepeaterStrategy,
    },
  ],
})
export class TableComponent<T> {
  protected readonly _viewRepeater: _ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>;

  // Outlets in the table's template where the header, data rows, and footer will be inserted.
  _headerRowOutlet: HeaderRowOutlet | null = null;

  constructor(...args: unknown[]);

  constructor(
    @Inject(_VIEW_REPEATER_STRATEGY)
    viewRepeaterStrategy: _ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>
  ) {
    this._viewRepeater = viewRepeaterStrategy;
  }

  _outletAssigned() {
    console.log('assign all outlets');
  }

  renderRows() {
    this._viewRepeater.applyChanges();
  }
}
