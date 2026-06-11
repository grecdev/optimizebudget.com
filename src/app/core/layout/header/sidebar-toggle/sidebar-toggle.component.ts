import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';

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
export class SidebarToggleComponent {
  /**
   * @summary - State of the sidebar.
   *
   * @type {boolean}
   *
   * @public
   */
  public sidebarOpen: boolean = false;

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

  constructor(sidebarService: SidebarService, changeDetectorRef: ChangeDetectorRef) {
    this._sidebarService = sidebarService;
    this._changeDetectorRef = changeDetectorRef;
  }

  /**
   * @summary - Click event handler to toggle the sidebar state.
   *
   * @param {MouseEvent} event - Event object.
   *
   * @public
   * @returns {void}
   */
  public handleSidebarToggle(event: MouseEvent): void {
    event.stopPropagation();

    this._sidebarService.toggleSidebar();
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
        this.sidebarOpen = data;
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
    this._initSidebarOpenSubscription();
  }

  ngOnDestroy(): void {
    this._initCleanup();
  }
}
