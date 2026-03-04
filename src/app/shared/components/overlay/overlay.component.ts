// Future note: Please use newer syntax and features

import {
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';

import {
  type AppOverlayContentInstances,
  type AppOverlayComponentInstances,
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
   * @summary - Options assigned from outside the component.
   *
   * @type {AppOverlayComponentInstances['options']}
   * @public
   */
  public options: AppOverlayComponentInstances['options'] = {
    noBackground: false,
  };

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

    if (!ALLOWED_KEYS.includes(event.code) || event.altKey) {
      return;
    }

    this.close.emit(null);
  }

  @HostBinding('class.no-background') get hostNoBackground(): boolean {
    return this.options.noBackground;
  }
}
