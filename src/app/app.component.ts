import {
  type AfterViewInit,
  type OnInit,
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs';

import { allRoutes } from '@script/globalData';

import { AuthenticationService } from '@core/authentication/authentication.service';

import { type SidebarComponent } from '@core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-logged-in]': '!hideLayout',
  },
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * @summary - Dynamically render components.
   *
   * @type {boolean}
   *
   * @public
   */
  public hideLayout: boolean = true;

  private readonly _authenticationService: AuthenticationService;
  private readonly _router: Router;
  private readonly _changeDetectorRef: ChangeDetectorRef;

  @ViewChild('appHeader', {
    read: ElementRef<HTMLElement>,
  })
  private readonly _appHeader: ElementRef<HTMLElement> | null = null;

  @ViewChild('appSidebar')
  private readonly _appSidebar: SidebarComponent | null = null;

  constructor(
    authenticationService: AuthenticationService,
    router: Router,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this._authenticationService = authenticationService;
    this._router = router;
    this._changeDetectorRef = changeDetectorRef;
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
    if (this.hideLayout) {
      return;
    }

    const NATIVE_ELEMENT_HEADER = this._appHeader && this._appHeader.nativeElement;

    if (!NATIVE_ELEMENT_HEADER || !this._appSidebar) {
      throw Error('Elements not found!');
    }

    const HEIGHT = NATIVE_ELEMENT_HEADER.getBoundingClientRect().height;

    this._appSidebar.headerHeight = HEIGHT;
  }

  /**
   * @summary - Change state on route change.
   *
   * @private
   * @returns {void}
   */
  private _initRouterEvents(): void {
    this._router.events
      .pipe(
        filter(data => data instanceof NavigationEnd),
        map(data => data as NavigationEnd)
      )
      .subscribe({
        next: data => {
          const URL = data.url.replace('/', '');

          const AUTHENTICATION_ROUTES = [
            allRoutes.login.path,
            allRoutes.register.path,
            allRoutes.forgotPassword.path,
          ];

          // Array method is using '===' operator to check for value.
          const hideLayout =
            AUTHENTICATION_ROUTES.some(item => URL.includes(item)) ||
            !this._authenticationService.isAuthenticated;

          this.hideLayout = hideLayout;
          this._changeDetectorRef.markForCheck();
        },
      });
  }

  public ngOnInit(): void {
    this._initRouterEvents();
  }

  public ngAfterViewInit(): void {
    this._setHeaderHeight();
  }
}
