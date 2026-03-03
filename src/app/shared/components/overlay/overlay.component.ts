// Future note: Please use newer syntax and features

import {
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';

import { type AppOverlayInstances } from './overlay.model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOverlayComponent implements AppOverlayInstances {
  private readonly _elementRef: ElementRef<AppOverlayComponent>;

  @Output() close: EventEmitter<null> = new EventEmitter();

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
    const OVERLAY_CLICKED = TARGET === NATIVE_ELEMENT;

    if (!OVERLAY_CLICKED) {
      return;
    }

    this.close.emit(null);
  }

  /**
   * @summary - Pressing ESCAPE key to close the overlay.
   *
   * @param {Event} event - Event object.
   *
   * @private
   * @returns {void}
   */
  @HostListener('window:keydown', ['$event']) onEscapeKey(event: KeyboardEvent): void {
    event.stopPropagation();

    const ALLOWED_KEYS = ['Escape'];

    if (!ALLOWED_KEYS.includes(event.code)) {
      return;
    }

    this.close.emit(null);
  }
}
