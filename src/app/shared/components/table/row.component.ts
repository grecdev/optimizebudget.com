import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation } from '@angular/core';

const ROW_TEMPLATE = '<ng-container cellOutlet></ng-container>';

/**
 * Outlet for rendering cells inside of a row
 */
@Directive({
  selector: 'cellOutlet',
})
export class CellOutlet {}

/**
 * Header template component that contains the cell outlet.
 */
@Component({
  selector: 'tr[app-header-component]',
  template: ROW_TEMPLATE,
  host: {
    class: 'header-row',
    role: 'row',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRow {}
