import {
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { filter, of, switchMap, tap, BehaviorSubject } from 'rxjs';

// import { SidebarService } from '@shared/services/sidebar/sidebar.service';
import { MediaQueryService } from '@shared/services/media-query/media-query.service';

import { type SetSidebarStyleOptions } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  /**
   * @summary - Based on this member, render our components, inside the template.
   *
   * @type {boolean}
   *
   * @public
   */
  public isMobile: boolean = false;

  // private readonly _sidebarService: SidebarService;
  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _mediaQueryService: MediaQueryService;

  private readonly _elementRef: ElementRef<HTMLElement>;

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
    // sidebarService: SidebarService,
    mediaQueryService: MediaQueryService,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef
  ) {
    // this._sidebarService = sidebarService;
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

  ngOnInit(): void {
    this._initMediaQuerySubscription();
  }
}
