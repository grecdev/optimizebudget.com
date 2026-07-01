import {
  type AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

import { type SidebarComponent } from '@core/layout/sidebar/sidebar.component';

import { AuthenticationService } from '@core/authentication/authentication.service';

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

  private readonly _sidebarService: AuthenticationService;

  @ViewChild('appHeader', {
    read: ElementRef<HTMLElement>,
  })
  private readonly _appHeader: ElementRef<HTMLElement> | null = null;

  @ViewChild('appSidebar')
  private readonly _appSidebar: SidebarComponent | null = null;

  constructor(sidebarService: AuthenticationService) {
    this._sidebarService = sidebarService;
  }

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

  async loadTodos(): Promise<void> {
    try {
      const response = await this._sidebarService.getTodos();

      if (response.error) {
        console.error(response.error.message);
      }

      if (response.data) {
        console.log(response.data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  ngAfterViewInit(): void {
    this._setHeaderHeight();
  }

  async ngOnInit(): Promise<void> {
    await this.loadTodos();
  }
}
