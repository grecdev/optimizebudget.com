import { Component } from '@angular/core';

import { HeaderRowOutlet } from '@shared/components/table/row.component';

import { TABLE, VIEW_REPEATER_STRATEGY } from './tokens';

import { _ViewRepeaterStrategy } from './view-repeater-strategy';

@Component({
  selector: 'table[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: TABLE,
      useExisting: TableComponent,
    },
    {
      provide: VIEW_REPEATER_STRATEGY,
      useClass: _ViewRepeaterStrategy,
    },
  ],
})
export class TableComponent {
  // Outlets in the table's template where the header, data rows, and footer will be inserted.
  _headerRowOutlet: HeaderRowOutlet | null = null;

  _outletAssigned() {
    console.log('assign all outlets');
  }
}
