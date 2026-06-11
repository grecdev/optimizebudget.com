import {
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { filter, of, switchMap, tap, BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { type SidebarObservableState } from '@shared/services/sidebar/sidebar.service.model';

import { MediaQueryService } from '@shared/services/media-query/media-query.service';

import { type SetSidebarStyleOptions } from './sidebar.model';
import { containerAnimation } from './sidebar-animations.component';

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
   * @summary - For cleanup purposes.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _destroy$: Subject<void> = new Subject<void>();

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
      throw Error('Native element not found!');
    }

    if (height !== -1) {
      heightStyle = `${height}px`;
    }

    NATIVE_ELEMENT.style.top = heightStyle;
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

    sidebarOpenSubscriber.pipe(takeUntil(this._destroy$)).subscribe({
      next: data => {
        this.sidebarState = data;
        this._changeDetectorRef.markForCheck();
      },
    });
  }

  /**
   * @summary - Cleanup whatever you need.
   *
   * @private
   * @returns {void}
   */
  private _initCleanup(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();
    this._initSidebarOpenSubscription();
  }

  ngOnDestroy(): void {
    this._initCleanup();
  }
}
