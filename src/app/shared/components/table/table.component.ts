import { Component } from '@angular/core';

import { TABLE } from './tokens';
import { HeaderRowOutlet } from '@shared/components/table/row.component';

@Component({
  selector: 'table[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: TABLE,
      useExisting: TableComponent,
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
