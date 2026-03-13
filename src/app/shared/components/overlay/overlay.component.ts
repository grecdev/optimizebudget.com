// Future note: Please use newer syntax and features

import {
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  HostBinding,
} from '@angular/core';

import {
  type AppOverlayComponentInstances,
  type AppOverlayContentInstances,
} from './overlay.model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOverlayComponent
  implements AppOverlayContentInstances, AppOverlayComponentInstances
{
  private readonly _elementRef: ElementRef<AppOverlayComponent>;

  /**
   * @summary - Assigned from the OverlayService.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @public
   */
  public overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Assigned from the OverlayService.
   *
   * @type {AppOverlayComponentInstances['options']}
   *
   * @public
   */
  public options: AppOverlayComponentInstances['options'] = {
    noBackground: false,
  };

  constructor(elementRef: ElementRef<AppOverlayComponent>) {
    this._elementRef = elementRef;
  }

  /**
   * @summary - Clicking on the overlay to close the overlay.
   *
   * @param {Event} event - Event object.
   *
   * @private
   * @returns {void}
   */
  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    event.stopPropagation();

    const NATIVE_ELEMENT = this._elementRef.nativeElement as AppOverlayComponent;

    if (!NATIVE_ELEMENT) {
      throw Error('Native element not found for AppOverlayComponent!');
    }

    const TARGET = event.target as HTMLElement | AppOverlayComponent;
    const CURRENT_TARGET_CLICKED = TARGET === NATIVE_ELEMENT;

    if (!CURRENT_TARGET_CLICKED) {
      return;
    }

    this._triggerOverlayClose();
  }

  /**
   * @summary - Pressing ESCAPE key to close the overlay.
   *
   * @param {Event} event - Event object.
   *
   * @private
   * @returns {void}
   */
  @HostListener('document:keydown.escape', ['$event']) onEscapeKey(
    event: KeyboardEvent
  ): void {
    event.stopPropagation();

    this._triggerOverlayClose();
  }

  @HostBinding('class.no-background') get hostNoBackground(): boolean {
    return this.options.noBackground;
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
