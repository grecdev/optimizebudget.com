import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewContainerRef,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';

import { CellDef } from './cell.component';

const ROW_TEMPLATE = '<ng-container cellOutlet></ng-container>';

/**
 * Outlet for rendering cells inside a row
 */
@Directive({
  selector: '[cellOutlet]',
})
export class CellOutlet implements OnDestroy {
  _viewContainerRef: ViewContainerRef;

  cells: CellDef[] = [];

  context: any;

  /**
   * Static property used to assign a reference to the last embedded element in the view.
   *
   * Contains the latest constructed instance of this class.
   *
   * When the rows (Row, HeaderRow) are creating using the createEmbeddedView method,
   * this property will provide a handle that provide the component's cell and context.
   *
   * After the initialization the cell outlet will construct the cells with the provided context.
   */
  static mostRecentCellOutlet: CellOutlet | null = null;

  constructor(...args: unknown[]);

  constructor(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;

    CellOutlet.mostRecentCellOutlet = this;
  }

  ngOnDestroy() {
    /**
     * If this was the last CellOutlet being rendered in the view, remove its reference
     * from the static property after it has been destroyed, to avoid leaking memory
     */
    if (CellOutlet.mostRecentCellOutlet === this) {
      CellOutlet.mostRecentCellOutlet = null;
    }
  }
}

/**
 * Header template component that contains the cell outlet.
 */
@Component({
  selector: 'tr[app-header-row]',
  template: ROW_TEMPLATE,
  host: {
    class: 'app-header-row',
    role: 'row',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRow {}
