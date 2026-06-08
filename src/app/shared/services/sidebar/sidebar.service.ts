import { Injectable } from '@angular/core';

import { Subject, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /**
   * @summary - Track if sidebar is open.
   *
   * @type {boolean}
   *
   * @public
   */
  sidebarOpen: boolean = false;

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
   * @summary - Main stream for state changes.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _toggleSidebar: Subject<void> = new Subject<void>();

  constructor() {
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
        this.sidebarOpen = !this.sidebarOpen;
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
