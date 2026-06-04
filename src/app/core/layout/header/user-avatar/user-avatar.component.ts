import { ChangeDetectorRef, Component } from '@angular/core';

import { MediaQueryService } from '@shared/services/media-query/media-query.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  fullName: string = 'Grecu Alexandru';
  email: string = 'mail@example.com';

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

  constructor(mediaQueryService: MediaQueryService, changeDetectorRef: ChangeDetectorRef) {
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
    this._mediaQueryService.mediaQuery('max', 'md').subscribe({
      next: value => {
        this.isMobile = value;

        this._changeDetectorRef.markForCheck();
      },
    });
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();
  }
}
