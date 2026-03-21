// Future note: update deprecated code. 😚

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryService } from '@shared/components/icon/icon-registry.service';
import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { type AppDialogOptions } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-dialog',
  },
})
export class AppDialogComponent implements AppDialogOptions, AppOverlayContentInstances {
  private readonly _domSanitizer: DomSanitizer;
  private readonly _elementRef: ElementRef;

  /**
   * @summary - Icon registry service, used to store icons and then render them in template.
   *
   * @type {IconRegistryService}
   *
   * @private
   * @readonly
   */
  private readonly _iconRegistryService: IconRegistryService;

  /**
   * @summary - Assigned from the OverlayService.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @public
   */
  public overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   * @readonly
   */
  public readonly icons: {
    [key: string]: string;
  } = {
    xmark: 'xmark',
  };

  /**
   * @summary - Title of the dialog.
   *
   * @type {string}
   *
   * @public
   */
  public title: string = 'Please add your title!';

  /**
   * @summary - Close button + icon.
   *
   * @type {boolean}
   *
   * @public
   */
  public closeButton: boolean = true;

  constructor(
    iconRegistryService: IconRegistryService,
    domSanitizer: DomSanitizer,
    elementRef: ElementRef
  ) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;
    this._elementRef = elementRef;

    this._initIconRegistry();
  }

  @HostListener('click', ['$event']) handleClickRoot(event: MouseEvent) {
    event.stopPropagation();

    const NATIVE_ELEMENT = this._elementRef.nativeElement as AppDialogComponent;

    if (!NATIVE_ELEMENT) {
      throw Error('Native element not found for AppDialogComponent!');
    }

    const TARGET = event.target as HTMLElement | AppDialogComponent;
    const CURRENT_TARGET_CLICKED = TARGET === NATIVE_ELEMENT;

    if (!CURRENT_TARGET_CLICKED) {
      return;
    }

    this._triggerOverlayClose();
  }
  /**
   * @summary - Clicking on the dynamically rendered button.
   *
   * @param {Event} event - Event object.
   *
   * @public
   * @returns {void}
   */
  public handleButtonCloseClick(event: MouseEvent): void {
    event.stopPropagation();

    this._triggerOverlayClose();
  }

  /**
   * @summary - Registry icons used in this component.
   *
   * @private
   * @returns {void}
   */
  private _initIconRegistry(): void {
    Object.values(this.icons).forEach(item => {
      this._iconRegistryService.addSvgIconConfig({
        name: item,
        url: this._domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${item}.svg`
        ),
      });
    });
  }

  /**
   * @summary - Trigger overlay reference subscription event.
   *
   * @private
   * @returns {void}
   */
  private _triggerOverlayClose(): void {
    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.close();
  }
}
