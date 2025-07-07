import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  computed,
  ElementRef,
  AfterContentInit,
  inject,
  DestroyRef,
} from '@angular/core';

import { fromEvent } from 'rxjs';

import { ThemeVariant, ThemeColor } from '@script/types';

import { TextFieldLabelOptions } from '@shared/components/text-field/text-field.model';

/**
 * @summary - An input element used inside a form component, can be either controlled or uncontrolled
 *
 * @param {ThemeVariant} variant - "basic" | "contained" | "outlined"
 * @param {TextFieldLabelOptions} labelOptions - Options if you want to add any label
 * @param {TextFieldIconOptions} [iconOptions] - Options if you want to use icons in input fields
 * @param {ThemeColor} color - Input color
 *
 * @example Implementation
 *
 * ```
 *  <app-text-field
 *     variant="basic"
 *     color="white-default"
 *     [labelOptions]="{
 *       textContent: 'Name',
 *       position: 'top'
 *     }"
 *   >
 *     <input appInput type="text" />
 *   </app-text-field>
 * ```
 *
 * @returns An angular component - html button element
 * @public
 */
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-text-field',
    '[class]': 'classNameHost()',
  },
})
export class TextFieldComponent implements AfterContentInit {
  readonly variant = input.required<ThemeVariant>();
  readonly color = input.required<ThemeColor>();
  readonly labelOptions = input.required<TextFieldLabelOptions>();
  readonly error = input<string>('');

  private readonly _hostElement = inject(ElementRef);
  private readonly _destroyRef = inject(DestroyRef);

  classNameHost = computed<string>(() => {
    const classNameArray = [`inputVariant-${this.variant()}`, `inputColor-${this.color()}`];

    if (this.error()) {
      classNameArray.push('withError');
    }

    return classNameArray.join(' ');
  });

  classNameLabel = computed<string>(() => {
    const { position } = this.labelOptions();

    const classNameArray = ['inputLabel', `labelPosition-${position}`];

    return classNameArray.join(' ');
  });

  ngAfterContentInit() {
    // Can be input or textarea
    const editableElement =
      this._hostElement &&
      this._hostElement.nativeElement &&
      this._hostElement.nativeElement.querySelector('[appInput]');

    if (!editableElement) {
      return;
    }

    const inputEvent = fromEvent<InputEvent>(editableElement, 'input');

    this._checkTextFieldLength(editableElement);

    const inputEventSubscription = inputEvent.subscribe((event) => {
      event.stopPropagation();

      const currentTarget = event.currentTarget as HTMLInputElement | HTMLTextAreaElement;

      this._checkTextFieldLength(currentTarget);
    });

    this._destroyRef.onDestroy(() => {
      inputEventSubscription.unsubscribe();
    });
  }

  /**
   * @summary
   *
   * Add data-* attribute to text field whenever we have a value, in order to modify its styling
   *
   * @private
   * @return {void}
   */
  private _checkTextFieldLength(target: HTMLInputElement | HTMLTextAreaElement) {
    if (!target) {
      return;
    }

    const hasValue = target.value.length > 0;
    const attributeName = 'data-has-value';

    if (hasValue) {
      target.setAttribute(attributeName, '');
    } else {
      target.removeAttribute(attributeName);
    }
  }
}
