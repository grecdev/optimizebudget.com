// Future note: Please use newer syntax and features

import {
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  HostBinding,
} from '@angular/core';

import { type AppOverlayComponentInstances } from './overlay.model';

import { OverlayReference } from './overlay-reference';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOverlayComponent {
  private readonly _elementRef: ElementRef<AppOverlayComponent>;

  // Added via instance upon creation
  public overlayReference: OverlayReference | null = null;

  /**
   * @summary - Options assigned from outside the component.
   *
   * @type {AppOverlayComponentInstances['options']}
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

    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.close();
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

    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.closeLastOverlay();
  }

  @HostBinding('class.no-background') get hostNoBackground(): boolean {
    return this.options.noBackground;
  }
}
