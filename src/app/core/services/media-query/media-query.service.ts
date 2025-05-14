import { Injectable } from '@angular/core';

import { fromEvent, map, Observable, startWith } from 'rxjs';

import { Breakpoint, BreakpointLevel, BreakpointRangeLimit } from './media-query.model';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  private readonly breakpoints: Breakpoint = {
    sm: '570px',
    md: '768px',
    lg: '850px',
    xl: '1024px',
    xxl: '1280px',
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
   *   initMediaQuerySubscription(): void {
   *     const mediaQuerySubscription = this.mediaQueryService.mediaQuery('max', 'xl').subscribe({
   *       next: (data) => {
   *         this.isMobile.set(data);
   *
   *         this.setBodySpacing();
   *       },
   *     });
   *
   *     this.destroyRef.onDestroy(() => {
   *       mediaQuerySubscription.unsubscribe();
   *     });
   *   }
   * ```
   *
   * @public
   * @returns {Observable<boolean>}
   */
  mediaQuery(rangeLimit: BreakpointRangeLimit, breakPoint: BreakpointLevel): Observable<boolean> {
    const mediaId = `${rangeLimit}-${breakPoint}`;
    const mediaQueryString = `(${rangeLimit}-width: ${this.breakpoints[breakPoint]})`;

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
