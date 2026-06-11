import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { type SidebarObservableState, type ToggleSidebarOptions } from './sidebar.service.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /**
   * @summary - So we don't expose the main stream.
   *
   * @type {Observable<SidebarObservableState>}
   *
   * @public
   * @readonly
   */
  public readonly sidebarOpen$: Observable<SidebarObservableState> | null = null;

  /**
   * @summary - Whenever I want to prevent multiple trigger events.
   *
   * @type {number}
   *
   * @public
   * @readonly
   */
  public readonly toggleDelayMS: number = 1000;

  /**
   * @summary - Stream to track the state.
   *
   * @type {BehaviorSubject<SidebarObservableState>}
   *
   * @private
   * @readonly
   */
  private readonly _sidebarOpen: BehaviorSubject<SidebarObservableState> =
    new BehaviorSubject<SidebarObservableState>({
      childOpen: false,
      parentOpen: false,
    });

  /**
   * @summary - Stream to trigger events.
   *
   * @type {Subject<SidebarObservableState>}
   *
   * @private
   * @readonly
   */
  private readonly _toggleSidebar: Subject<SidebarObservableState> =
    new Subject<SidebarObservableState>();

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
    this._toggleSidebar.pipe().subscribe({
      next: (data: SidebarObservableState) => {
        const DATA = Object.assign({}, this._sidebarOpen.getValue(), data);

        this._sidebarOpen.next(DATA);
      },
    });
  }

  /**
   * @summary - Change  the sidebar state stream.
   *
   * @param {ToggleSidebarOptions['parentOpen']} options.parentOpen - The parent state.
   * @param {ToggleSidebarOptions['childrenOpen']} options.parentOpen - The children state.
   *
   * @public
   * @returns {void}
   */
  public toggleSidebar(options: ToggleSidebarOptions): void {
    this._toggleSidebar.next(options);
  }
}
