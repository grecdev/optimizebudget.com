import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { APP_SELECT_COMPONENT_REFERENCE } from '../select.tokens';

import { type AppSelectComponent } from '../select.component';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-select-option',
    '[class.disabled]': 'disabled',
    '[class.selected]': 'selected',
  },
})
export class AppSelectOptionComponent implements OnInit {
  private _elementRef: ElementRef;

  /**
   * @summary - Accessing parent root data.
   *
   * @type {AppSelectComponent}
   *
   * @private
   * @readonly
   */
  private readonly _selectRoot: AppSelectComponent;

  /**
   * @summary - Option's current value
   *
   * @type {string}
   *
   * @public
   */
  @Input({ required: true }) public get value(): string {
    return this._value;
  }

  set value(value: string) {
    if (value === this._value) {
      return;
    }

    this._value = value;
  }

  private _value: string = '';

  /**
   * @summary - Set the default selected value.
   *
   * @type {boolean}
   *
   * @public
   */
  @Input({
    transform: booleanAttribute,
  })
  get selected(): boolean {
    return this._selected;
  }

  set selected(value) {
    if (value === this._selected) {
      return;
    }

    this._selected = value;
  }

  private _selected: boolean = false;

  /**
   * @summary - Disable option.
   *
   * @type {boolean}
   *
   * @public
   */
  @Input({
    transform: booleanAttribute,
  })
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value) {
    if (value === this._disabled) {
      return;
    }

    this._disabled = value;
  }

  private _disabled: boolean = false;

  constructor(
    @Inject(APP_SELECT_COMPONENT_REFERENCE) selectRoot: AppSelectComponent,
    elementRef: ElementRef
  ) {
    this._selectRoot = selectRoot;
    this._elementRef = elementRef;
  }

  @HostListener('click', ['$event']) handleClick(event: MouseEvent) {
    event.stopPropagation();

    if (this._disabled) {
      return;
    }

    this._setValue();
  }

  /**
   * @summary - Get text content from the element reference.
   *
   * @private
   * @returns {string}
   */
  private _getTextContent(): string {
    const NATIVE_ELEMENT = this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      return '';
    }

    return NATIVE_ELEMENT.textContent;
  }

  /**
   * @summary - Trigger change from parent.
   *
   * @private
   * @returns {void}
   */
  private _setValue(): void {
    const TEXT_CONTENT = this._getTextContent();

    if (!this._selectRoot) {
      throw Error('Elements not found!');
    }

    this._selectRoot.handleOptionChange({
      value: this._value,
      textContent: this._value.length > 0 ? TEXT_CONTENT : '',
    });
  }

  /**
   * @summary - Emit value if selected via template.
   *
   * @private
   * @returns {void}
   */
  private _handleSelectedValue(): void {
    if (!this._selected) {
      return;
    }

    this._setValue();
  }

  ngOnInit() {
    this._handleSelectedValue();
  }
}
