import {
  type TemplateRef,
  type EmbeddedViewRef,
  ChangeDetectorRef,
  Component,
  ViewChild,
  HostListener,
} from '@angular/core';

import { MediaQueryService } from '@shared/services/media-query/media-query.service';
import { AppOverlayService } from '@shared/components/overlay/overlay.service';
import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { type SetOptionsContainerStyleOptions } from './user-avatar.model';

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
  private readonly _appOverlayService: AppOverlayService;

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

  @ViewChild('userInfoWrapperMobile')
  private readonly _userInfoWrapperMobile: TemplateRef<void> | null = null;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    mediaQueryService: MediaQueryService,
    appOverlayService: AppOverlayService
  ) {
    this._mediaQueryService = mediaQueryService;
    this._changeDetectorRef = changeDetectorRef;
    this._appOverlayService = appOverlayService;
  }

  /**
   * @summary - Event to trigger whenever we want to open the menu
   *
   * @param {MouseEvent} event - The evento object
   *
   * @public
   * @returns {void}
   */
  @HostListener('click', ['$event']) handleClick(event: MouseEvent): void {
    event.stopPropagation();

    const CURRENT_TARGET = event.currentTarget as HTMLElement;

    if (!this._userInfoWrapperMobile || !CURRENT_TARGET) {
      throw Error('Elements not found!');
    }

    if (this._menuOpen) {
      this._triggerClose();
      return;
    }

    this._menuOpen = true;

    const USER_INFO_WRAPPER_EMBEDDED_VIEW = this._initUserInfoWrapperMobileEmbedded();

    this._setOptionsContainerStyle({
      wrapper: USER_INFO_WRAPPER_EMBEDDED_VIEW,
      currentTarget: CURRENT_TARGET,
    });

    this._overlayReference = this._appOverlayService.appendOverlay({
      contentReferences: [USER_INFO_WRAPPER_EMBEDDED_VIEW],
      projectableNodes: [USER_INFO_WRAPPER_EMBEDDED_VIEW.rootNodes],
      instanceOptions: {
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

    this._triggerClose();
  }

  /**
   * @summary - Init the media query subscription.
   *
   * @private
   * @returns {void}
   */
  private _initMediaQuerySubscription(): void {
    this._mediaQueryService.mediaQuery('max', 'md').subscribe({
      next: value => {
        this.isMobile = value;

        this._changeDetectorRef.markForCheck();
      },
    });
  }

  /**
   * @summary - Instantiate the overlay container options embedded view.
   *
   * @private
   * @returns {EmbeddedViewRef<void>}
   */
  private _initUserInfoWrapperMobileEmbedded(): EmbeddedViewRef<void> {
    if (!this._userInfoWrapperMobile) {
      throw Error('Wrapper not found!');
    }

    const VIEW = this._userInfoWrapperMobile.createEmbeddedView();
    const ROOT_NODES = VIEW.rootNodes;

    if (!ROOT_NODES || ROOT_NODES.length === 0) {
      throw Error('Root nodes not found in select!');
    }

    return VIEW;
  }

  /**
   * @summary - Close trigger for menu wrapper.
   *
   * @private
   * @returns {void}
   */
  private _triggerClose(): void {
    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._overlayReference.close();
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

    if (!CONTAINER) {
      throw Error('Container not found!');
    }

    Object.assign(CONTAINER.style, {
      top: `${top + height}px`,
      left: `${left}px`,
    });
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();
  }

  ngAfterViewInit(): void {}
}
