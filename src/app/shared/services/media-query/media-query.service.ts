import { Injectable } from '@angular/core';

import { fromEvent, map, Observable, startWith } from 'rxjs';

import { Breakpoint, BreakpointLevel, BreakpointRangeLimit } from './media-query.model';

/**
 * @summary - For mobile responsiveness.
 *
 * @implements
 *
 * ```
 * private _initMediaQuerySubscription(): void {
 *     this._mediaQueryService.mediaQuery('max', 'xl').subscribe({
 *       next: value => {
 *         this.isMobile = value;
 *         this._changeDetectorRef.markForCheck();
 *       },
 *     });
 *   }
 *
 *  ngOnInit(): void {
 *    this._initMediaQuerySubscription();
 *  }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  public readonly breakpointsPX: Breakpoint = {
    sm: 570,
    md: 768,
    lg: 850,
    xl: 1024,
    xxl: 1280,
  };

  private activeMediaQueries: { [key: string]: Observable<boolean> } = {};

  /**
   * @summary - Service's method used to dynamically rendering ui elements based on the device used
   *
   * @param {BreakpointRangeLimit} rangeLimit - Minimum or maximum breakpoints
   * @param {BreakpointLevel} breakPoint - Sizes in pixels
   *
   * @implements
   * ```
   * this.mediaQueryService.mediaQuery('max', 'xl').subscribe({
   *  next: (data) => {
   *    // Do whatever
   *  },
   * });
   * ```
   *
   * @public
   * @returns {Observable<boolean>}
   */
  mediaQuery(rangeLimit: BreakpointRangeLimit, breakPoint: BreakpointLevel): Observable<boolean> {
    const mediaId = `${rangeLimit}-${breakPoint}`;
    const mediaQueryString = `screen and  (${rangeLimit}-width: ${this.breakpointsPX[breakPoint]}px)`;

    const mediaQuery = window.matchMedia(mediaQueryString);

    // If we use this service in multiple components, and we use the same breakpoint for those components, don't re-create the event listener.
    if (mediaId in this.activeMediaQueries) {
      return this.activeMediaQueries[mediaId];
    }

    const dynamicMediaQuery = fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((query: MediaQueryList) => query.matches)
    );

    this.activeMediaQueries[mediaId] = dynamicMediaQuery;

    return dynamicMediaQuery;
  }
}
