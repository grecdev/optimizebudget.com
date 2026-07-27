import {
  type TemplateRef,
  type EmbeddedViewRef,
  type OnDestroy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ApplicationRef,
} from '@angular/core';

// import { MediaQueryService } from '@shared/services/media-query/media-query.service';

import { AppOverlayService } from '@shared/components/overlay/overlay.service';
import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import {
  type SetOptionsContainerStyleOptions,
  type UserInfoWrapperContext,
} from './user-avatar.model';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent implements OnDestroy {
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
  // private readonly _mediaQueryService: MediaQueryService;
  private readonly _appOverlayService: AppOverlayService;
  private readonly _applicationReference: ApplicationRef;

  /**
   * @summary - Check if the menu is open.
   *
   * @type {boolean}
   *
   * @private
   */
  private _menuOpen: boolean = false;

  /**
   * @summary - Overlay reference, to subscribe on events.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  private _userInfoWrapperEmbeddedViewRef: EmbeddedViewRef<UserInfoWrapperContext> | null = null;

  @ViewChild('userInfoWrapper')
  private readonly _userInfoWrapper: TemplateRef<UserInfoWrapperContext> | null = null;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    // mediaQueryService: MediaQueryService,
    appOverlayService: AppOverlayService,
    applicationReference: ApplicationRef
  ) {
    // this._mediaQueryService = mediaQueryService;
    this._changeDetectorRef = changeDetectorRef;
    this._appOverlayService = appOverlayService;
    this._applicationReference = applicationReference;
  }

  /**
   * @summary - Event to trigger whenever we want to open the menu
   *
   * @param {MouseEvent} event - The event object
   *
   * @public
   * @returns {void}
   */
  public handleOpenUserAvatarMenu(event: MouseEvent): void {
    event.stopPropagation();

    const CURRENT_TARGET = event.currentTarget as HTMLElement;

    if (!this._userInfoWrapper || !CURRENT_TARGET) {
      throw Error('Elements not found!');
    }

    if (this._menuOpen) {
      this._triggerClose();
      return;
    }

    this._menuOpen = true;

    this._initUserInfoWrapperEmbedded();

    if (!this._userInfoWrapperEmbeddedViewRef) {
      return;
    }

    this._setOptionsContainerStyle({
      wrapper: this._userInfoWrapperEmbeddedViewRef,
      currentTarget: CURRENT_TARGET,
    });

    this._overlayReference = this._appOverlayService.appendOverlay({
      contentReferences: [this._userInfoWrapperEmbeddedViewRef],
      projectableNodes: [this._userInfoWrapperEmbeddedViewRef.rootNodes],
      overlayInstanceOptions: {
        noBackground: true,
      },
    });

    this._initCloseSubscription();
  }

  /**
   * @summary - Event for embedded wrapper.
   *
   * @param {MouseEvent} event - The event object.
   *
   * @public
   * @returns {void}
   */
  public handleClickOnWrapper(event: MouseEvent): void {
    event.stopPropagation();

    const WRAPPER_CLICKED = event.target === event.currentTarget;

    if (!WRAPPER_CLICKED) {
      event.preventDefault();
      return;
    }

    this._triggerClose();
  }

  /**
   * @summary - Init the media query subscription.
   *
   * @private
   * @returns {void}
   */
  // private _initMediaQuerySubscription(): void {
  //   this._mediaQueryService.mediaQuery('max', 'xl').subscribe({
  //     next: value => {
  //       this.isMobile = value;
  //
  //       this._changeDetectorRef.markForCheck();
  //     },
  //   });
  // }

  /**
   * @summary - Instantiate the overlay container options embedded view.
   *
   * @private
   * @returns {void}
   */
  private _initUserInfoWrapperEmbedded(): void {
    if (!this._userInfoWrapper) {
      throw Error('Wrapper not found!');
    }

    const CONTEXT_DATA = {
      fullName: this.fullName,
      email: this.email,
    };

    this._userInfoWrapperEmbeddedViewRef = this._userInfoWrapper.createEmbeddedView(CONTEXT_DATA);

    this._applicationReference.attachView(this._userInfoWrapperEmbeddedViewRef);

    const ROOT_NODES = this._userInfoWrapperEmbeddedViewRef.rootNodes;

    if (!ROOT_NODES || ROOT_NODES.length === 0) {
      throw Error('Root nodes not found in select!');
    }
  }

  /**
   * @summary - Close trigger for menu wrapper.
   *
   * @private
   * @returns {void}
   */
  private _triggerClose(): void {
    if (this._overlayReference) {
      this._overlayReference.close();
    }
  }

  /**
   * @summary - Close select upon closing the overlay.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(): void {
    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._overlayReference.closingOverlay$.subscribe({
      next: () => {
        this._menuOpen = false;

        this._changeDetectorRef.markForCheck();

        this._overlayReference = null;

        if (this._userInfoWrapperEmbeddedViewRef) {
          this._applicationReference.detachView(this._userInfoWrapperEmbeddedViewRef);

          this._userInfoWrapperEmbeddedViewRef = null;
        }
      },
    });
  }

  /**
   * @summary - Set styling for the native element.
   *
   * @param {SetOptionsContainerStyleOptions['wrapper']} options.wrapper - Embedded view element.
   * @param {SetOptionsContainerStyleOptions['currentTarget']} options.currentTarget - Clicked target.
   *
   * @private
   * @returns {void}
   */
  private _setOptionsContainerStyle(options: SetOptionsContainerStyleOptions): void {
    const { wrapper, currentTarget } = options;

    const { top, left, height } = currentTarget.getBoundingClientRect();

    const WRAPPER_ELEMENT = wrapper.rootNodes[0] as HTMLElement;
    const CONTAINER = WRAPPER_ELEMENT.querySelector<HTMLElement>('.user-info-container');
    const SPACING_PX = 16;

    if (!CONTAINER) {
      throw Error('Container not found!');
    }

    Object.assign(CONTAINER.style, {
      top: `${top + height + SPACING_PX / 2}px`,
      right: `${SPACING_PX}px`,
    });
  }

  ngOnInit(): void {
    // this._initMediaQuerySubscription();
  }

  public ngOnDestroy(): void {
    this._triggerClose();
  }
}
