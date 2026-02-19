import {
  ElementRef,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';

import { type DialogOptions } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements DialogOptions {
  private readonly _elementRef: ElementRef<DialogComponent>;

  public title: string = 'Please add your title!';
  public closeButton: boolean = true;

  @Output() closeDialog: EventEmitter<null> = new EventEmitter();

  constructor(elementRef: ElementRef<DialogComponent>) {
    this._elementRef = elementRef;
  }

  /**
   * @summary - Clicking on the dynamically rendered button.
   *
   * @param {Event} event - Event object.
   *
   * @public
   * @returns {void}
   */
  handleButtonCloseClick(event: MouseEvent): void {
    event.stopPropagation();

    this.closeDialog.emit(null);
  }

  /**
   * @summary - Clicking on the overlay.
   *
   * @param {Event} event - Event object.
   *
   * @private
   * @returns {void}
   */
  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    event.stopPropagation();

    const NATIVE_ELEMENT = this._elementRef.nativeElement as DialogComponent;

    if (!NATIVE_ELEMENT) {
      throw Error('Native element not found for DialogComponent!');
    }

    const TARGET = event.target as HTMLElement | DialogComponent;
    const OVERLAY_CLICKED = TARGET === NATIVE_ELEMENT;

    if (!OVERLAY_CLICKED) {
      return;
    }

    this.closeDialog.emit(null);
  }

  /**
   * @summary - Pressing ESCAPE key.
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

    this.closeDialog.emit(null);
  }
}
