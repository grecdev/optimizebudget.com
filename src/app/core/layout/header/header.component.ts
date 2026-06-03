import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { Subject, takeUntil } from 'rxjs';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';
import { MediaQueryService } from '@shared/services/media-query/media-query.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Hello world!';

  /**
   * @summary - Based on this member, render our components, inside the template.
   *
   * @type {boolean}
   *
   * @public
   */
  public isMobile: boolean = false;

  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _mediaQueryService: MediaQueryService;

  /**
   * @summary - Subject to unsubscribe on component destroy.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _mediaQueryDestroy$: Subject<void> = new Subject();

  constructor(
    iconRegistryService: IconRegistryService,
    sanitizer: DomSanitizer,
    mediaQueryService: MediaQueryService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    iconRegistryService.addSvgIconConfig({
      name: 'basic-notification-icon',
      url: sanitizer.bypassSecurityTrustResourceUrl('assets/icons/basic-notification-icon.svg'),
    });

    this._mediaQueryService = mediaQueryService;
    this._changeDetectorRef = changeDetectorRef;
  }

  /**
   * @summary - Init the media query subscription.
   *
   * @returns {void}
   * @private
   */
  private _initMediaQuerySubscription(): void {
    this._mediaQueryService
      .mediaQuery('max', 'md')
      .pipe(takeUntil(this._mediaQueryDestroy$))
      .subscribe({
        next: value => {
          this.isMobile = value;

          this._changeDetectorRef.markForCheck();
        },
      });
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();
  }

  ngOnDestroy(): void {
    this._mediaQueryDestroy$.complete();
  }
}
