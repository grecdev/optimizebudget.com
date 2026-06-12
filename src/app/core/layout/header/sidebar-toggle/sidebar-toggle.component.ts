import {
  type AfterViewInit,
  type OnInit,
  type OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { fromEvent, Subject, takeUntil, throttleTime } from 'rxjs';

import { type ClearTimeoutOptions } from '@shared/models/interfaces';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { type SidebarObservableState } from '@shared/services/sidebar/sidebar.service.model';

import { TRANSITION_DURATION_MS } from '@core/layout/sidebar/sidebar-animations.component';

import {
  topBarAnimation,
  middleBarAnimation,
  bottomBarAnimation,
} from './sidebar-toggle-animations.component';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [topBarAnimation, middleBarAnimation, bottomBarAnimation],
})
export class SidebarToggleComponent implements OnInit, AfterViewInit, OnDestroy {
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

  /**
   * @summary - To remove the timeout after wards.
   *
   * @type {ReturnType<typeof setTimeout> | null}
   *
   * @readonly
   */
  private _clickTimeout: ReturnType<typeof setInterval> | null = null;

  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _sidebarService: SidebarService;

  /**
   * @summary - For cleanup purposes.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _destroy$: Subject<void> = new Subject<void>();

  @ViewChild('sidebarToggleBtn')
  private readonly _sidebarToggleBtn: ElementRef<HTMLElement> | null = null;

  constructor(sidebarService: SidebarService, changeDetectorRef: ChangeDetectorRef) {
    this._sidebarService = sidebarService;
    this._changeDetectorRef = changeDetectorRef;
  }

  /**
   * @summary - Click event handler to toggle the sidebar state.
   *
   * @public
   * @returns {void}
   */
  public handleSidebarToggle(): void {
    const SIDEBAR_IS_CLOSED = [this.sidebarState.parentOpen, this.sidebarState.childOpen].every(
      item => !item
    );

    if (SIDEBAR_IS_CLOSED) {
      this._sidebarService.toggleSidebar({
        parentOpen: true,
        childOpen: true,
      });

      return;
    }

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
   * @summary - Init the click event.
   *
   * @private
   * @returns {void}
   */
  private _initClickEvent(): void {
    const NATIVE_ELEMENT = this._sidebarToggleBtn && this._sidebarToggleBtn.nativeElement;

    if (!NATIVE_ELEMENT) {
      throw Error('this._sidebarToggleBtn not found!');
    }

    fromEvent(NATIVE_ELEMENT, 'click')
      .pipe(takeUntil(this._destroy$), throttleTime(this._sidebarService.toggleDelayMS))
      .subscribe({
        next: (event: Event) => {
          event.stopPropagation();
          this.handleSidebarToggle();
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

    if (this._clickTimeout) {
      clearTimeout(this._clickTimeout);
    }
  }

  ngOnInit(): void {
    this._initSidebarOpenSubscription();
  }

  ngAfterViewInit(): void {
    this._initClickEvent();
  }

  ngOnDestroy(): void {
    this._initCleanup();
  }
}
