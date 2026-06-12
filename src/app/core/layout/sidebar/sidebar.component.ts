import {
  type OnInit,
  type OnDestroy,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';

import {
  filter,
  of,
  switchMap,
  tap,
  BehaviorSubject,
  Subject,
  takeUntil,
  throttleTime,
  EMPTY,
} from 'rxjs';

import { type ClearTimeoutOptions } from '@shared/models/interfaces';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { type SidebarObservableState } from '@shared/services/sidebar/sidebar.service.model';

import { MediaQueryService } from '@shared/services/media-query/media-query.service';

import { type SetSidebarStyleOptions } from './sidebar.model';
import { containerAnimation, TRANSITION_DURATION_MS } from './sidebar-animations.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [containerAnimation],
})
export class SidebarComponent implements OnInit, OnDestroy {
  /**
   * @summary - Based on this member, render our components, inside the template.
   *
   * @type {boolean}
   *
   * @public
   */
  public isMobile: boolean = false;

  /**
   * @summary - State of the sidebar.
   *
   * @type {SidebarObservableState}
   *
   * @public
   */
  public sidebarState: SidebarObservableState = {
    parentOpen: false,
    childOpen: false,
  };

  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _elementRef: ElementRef<HTMLElement>;
  private readonly _sidebarService: SidebarService;
  private readonly _mediaQueryService: MediaQueryService;

  /**
   * @summary - I am getting the height from its parent component.
   *
   * @type {BehaviorSubject<number>}
   *
   * @private
   * @readonly
   */
  private readonly _headerHeightSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  /**
   * @summary - Needs to be destroyed on each click (sidebar closing event).
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private _overlayClickDestroySubject$: Subject<void> = new Subject<void>();

  /**
   * @summary - For cleanup purposes.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _destroySubject$: Subject<void> = new Subject<void>();

  /**
   * @summary - To trigger the click events on the overlay.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _handleOverlayClickSubject$: Subject<void> = new Subject<void>();

  /**
   * @summary - To remove the timeout after wards.
   *
   * @type {ReturnType<typeof setTimeout> | null}
   *
   * @readonly
   */
  private _clickTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * @summary - Header's dynamically height.
   *
   * @type {number}
   *
   * @public
   */
  @Input() public get headerHeight(): number {
    return this._headerHeight;
  }

  /**
   * @summay - Used to click on the overlay.
   *
   * @type {ElementRef<HTMLElement>}
   *
   * @private
   * @readonly
   */
  @ViewChild('mobileWrapper') private readonly _mobileWrapper: ElementRef<HTMLElement> | null =
    null;

  public set headerHeight(value: number) {
    this._headerHeightSubject$.next(value);
    this._headerHeight = value;
  }

  private _headerHeight: number = -1;

  constructor(
    sidebarService: SidebarService,
    mediaQueryService: MediaQueryService,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef
  ) {
    this._sidebarService = sidebarService;
    this._mediaQueryService = mediaQueryService;
    this._changeDetectorRef = changeDetectorRef;
    this._elementRef = elementRef;
  }

  /**
   * @summary - Handle click event on overlay element.
   *
   * @param {Event} event - The DOM event object.
   *
   * @public
   * @returns {void}
   */
  public handleOverlayClick(event: Event): void {
    event.stopPropagation();

    const NATIVE_ELEMENT = this._mobileWrapper && this._mobileWrapper.nativeElement;

    if (!NATIVE_ELEMENT) {
      console.warn('this._mobileWrapper not found!');
      return;
    }

    if (event.target !== NATIVE_ELEMENT) {
      return;
    }

    this._handleOverlayClickSubject$.next();
  }

  /**
   * @summary - Dynamically set the sidebar style.
   *
   * @param {SetSidebarStyleOptions['height']} options.height - Header's height.
   *
   * @private
   * @returns {void}
   */
  private _setSidebarStyle(options: SetSidebarStyleOptions): void {
    const { height } = options;

    let heightStyle = '';

    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      console.warn('Native element not found!');
      return;
    }

    if (height !== -1) {
      heightStyle = `${height}px`;
    }

    NATIVE_ELEMENT.style.top = heightStyle;
  }

  /**
   * @summary - Clear timeout.
   *
   * @type {ClearTimeoutOptions["timeout"]} options.timeout - Timeout executed.
   *
   * @private
   * @returns {void}
   */
  private _clearTimeout(options: ClearTimeoutOptions): void {
    const { timeout } = options;

    if (timeout) {
      clearTimeout(timeout);
    }
  }

  /**
   * @summary - Event handler for overlay #mobileWrapper.
   *
   * @private
   * @returns {void}
   */
  private _closeSidebar(): void {
    this._sidebarService.toggleSidebar({
      childOpen: false,
    });

    this._clearTimeout({
      timeout: this._clickTimeout,
    });

    this._clickTimeout = setTimeout(() => {
      this._sidebarService.toggleSidebar({
        parentOpen: false,
      });
    }, TRANSITION_DURATION_MS);
  }

  /**
   * @summary - Init a chain of observers.
   *
   * Media query
   * Header height
   *
   * @returns {void}
   * @private
   */
  private _initMediaQuerySubscription(): void {
    this._mediaQueryService
      .mediaQuery('max', 'md')
      .pipe(
        tap(isMobile => {
          this.isMobile = isMobile;
          this._changeDetectorRef.markForCheck();
        }),
        switchMap(isMobile => {
          if (!isMobile) {
            return of(-1);
          }

          return this._headerHeightSubject$.pipe(filter(data => data !== -1));
        })
      )
      .subscribe({
        next: (height: number) => {
          this._setSidebarStyle({
            height,
          });
        },
      });
  }

  /**
   * @summary - Init the sidebar service subscription
   *
   * @private
   * @returns {void}
   */
  private _initSidebarOpenSubscription(): void {
    const sidebarOpenSubscriber = this._sidebarService.sidebarOpen$;

    if (!sidebarOpenSubscriber) {
      throw Error('sidebarOpenSubscriber not found!');
    }

    sidebarOpenSubscriber
      .pipe(
        takeUntil(this._destroySubject$),
        tap(data => {
          this.sidebarState = data;
          this._changeDetectorRef.markForCheck();
        }),
        switchMap(data => {
          const SIDEBAR_IS_CLOSED = [data.parentOpen, data.childOpen].every(item => !item);

          if (SIDEBAR_IS_CLOSED) {
            this._initDestroyOverlayClick();

            return EMPTY;
          }

          this._overlayClickDestroySubject$ = new Subject<void>();

          return this._handleOverlayClickSubject$.pipe(
            throttleTime(this._sidebarService.toggleDelayMS),
            takeUntil(this._overlayClickDestroySubject$)
          );
        })
      )
      .subscribe({
        next: () => {
          this._closeSidebar();
        },
      });
  }

  /**
   * @summary - Destroy the overlay click subject.
   *
   * @private
   * @returns {void}
   */
  private _initDestroyOverlayClick(): void {
    this._overlayClickDestroySubject$.next();
    this._overlayClickDestroySubject$.complete();
  }

  /**
   * @summary - Cleanup whatever you need.
   *
   * @private
   * @returns {void}
   */
  private _initCleanup(): void {
    this._destroySubject$.next();
    this._destroySubject$.complete();

    this._clearTimeout({
      timeout: this._clickTimeout,
    });

    this._initDestroyOverlayClick();
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();
    this._initSidebarOpenSubscription();
  }

  ngOnDestroy(): void {
    this._initCleanup();
  }
}
