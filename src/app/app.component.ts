import {
  type OnInit,
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

import { RouteUtil } from '@shared/utility/route';

import { type SidebarComponent } from '@core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-logged-in]': '!authenticationPage',
  },
})
export class AppComponent implements OnInit {
  /**
   * @summary - The main "app shell" state render.
   *
   * @type {boolean}
   *
   * @public
   */
  public authenticationPage: boolean = true;

  private readonly _router: Router;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _routeUtil = new RouteUtil();

  @ViewChild('appHeader', {
    read: ElementRef<HTMLElement>,
  })
  private readonly _appHeader: ElementRef<HTMLElement> | null = null;

  @ViewChild('appSidebar')
  private readonly _appSidebar: SidebarComponent | null = null;

  @ViewChild('mainContainer') private set _mainContainer(element: ElementRef<HTMLElement> | null) {
    if (!element) {
      return;
    }

    this._setHeaderHeight();
  }

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this._router = router;
    this._activatedRoute = activatedRoute;
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
    if (this.authenticationPage) {
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
    this._router.events.pipe(filter(data => data instanceof NavigationEnd)).subscribe({
      next: () => {
        const ACTIVATED_ROUTE_DATA = this._routeUtil.getDeepestRouteData(
          this._activatedRoute.firstChild
        );

        this.authenticationPage =
          (ACTIVATED_ROUTE_DATA && ACTIVATED_ROUTE_DATA.authenticationPage) ?? false;

        this._changeDetectorRef.markForCheck();
      },
    });
  }

  public ngOnInit(): void {
    this._initRouterEvents();
  }
}
