import {
  type AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

import { type SidebarComponent } from '@core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-logged-in]': 'userIsLoggedIn',
  },
})
export class AppComponent implements AfterViewInit {
  /**
   * @summary - For testing purposes.
   */
  userIsLoggedIn: boolean = true;

  @ViewChild('appHeader', {
    read: ElementRef<HTMLElement>,
  })
  private readonly _appHeader: ElementRef<HTMLElement> | null = null;

  @ViewChild('appSidebar')
  private readonly _appSidebar: SidebarComponent | null = null;

  /**
   * @summary - Dynamically change the sidebar position based on header height.
   *
   * Only on mobile version, though.
   *
   * @private
   * @returns {void}
   */
  private _setHeaderHeight(): void {
    const NATIVE_ELEMENT_HEADER = this._appHeader && this._appHeader.nativeElement;

    if (!NATIVE_ELEMENT_HEADER || !this._appSidebar) {
      throw Error('Elements not found!');
    }

    const HEIGHT = NATIVE_ELEMENT_HEADER.getBoundingClientRect().height;

    this._appSidebar.headerHeight = HEIGHT;
  }

  ngAfterViewInit(): void {
    this._setHeaderHeight();
  }
}
