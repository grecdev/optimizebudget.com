import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /**
   * @summary - So we don't expose the main stream.
   *
   * @type {Observable<boolean>}
   *
   * @public
   * @readonly
   */
  public readonly sidebarOpen$: Observable<boolean> | null = null;

  /**
   * @summary - Used to throttle the events.
   *
   * @type {number}
   *
   * @private
   * @readonly
   */
  private readonly _toggleDelayMS: number = 1000;

  /**
   * @summary - Stream to track the state.
   *
   * @type {BehaviorSubject<boolean>}
   *
   * @private
   * @readonly
   */
  private readonly _sidebarOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /**
   * @summary - Stream to trigger events.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _toggleSidebar: Subject<void> = new Subject<void>();

  constructor() {
    this.sidebarOpen$ = this._sidebarOpen.asObservable();

    this._initToggleSidebar();
  }

  /**
   * @summary - Tracks sidebar's state.
   *
   * @private
   * @returns {void}
   */
  private _initToggleSidebar(): void {
    this._toggleSidebar.pipe(throttleTime(this._toggleDelayMS)).subscribe({
      next: () => {
        const CURRENT_VALUE = this._sidebarOpen.getValue();

        this._sidebarOpen.next(!CURRENT_VALUE);
      },
    });
  }

  /**
   * @summary - Change  the sidebar state stream.
   *
   * @public
   * @returns {void}
   */
  public toggleSidebar(): void {
    this._toggleSidebar.next();
  }
}
