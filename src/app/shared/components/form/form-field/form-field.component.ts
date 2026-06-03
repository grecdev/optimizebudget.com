import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  ContentChild,
  ViewChild,
  booleanAttribute,
} from '@angular/core';

import { type ThemeVariant, type ThemeColor } from '@shared/models/types';

import { TextFieldLabelOptions } from './form-field.model';
import { AppFormFieldControl } from './form-field-control';

/**
 * @summary - An input element used inside a form component, can be either controlled or uncontrolled
 *
 * @param {ThemeVariant} variant - "basic" | "contained" | "outlined"
 * @param {TextFieldLabelOptions} labelOptions - Options if you want to add any label
 * @param {ThemeColor} color - Input color
 * @param {TextFieldIconOptions} [iconOptions] - Options if you want to use icons in input fields
 *
 * @example Implementation
 *
 * ```
 * <app-form-field
 *    variant="outlined"
 *    color="primary-default"
 *    [labelOptions]="{
 *      position: 'top',
 *    }"
 * >
 *   <app-input-label>Email</app-input-label>
 *
 *   <input appInput id="email" type="text" placeholder="mail@example.com" />
 * </app-form-field>
 * ```
 *
 * @returns An angular component - Custom Form Field component
 * @public
 */
@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-form-field',
    '[class.app-form-field-variant-outlined]': 'variant === "outlined"',
    '[class.app-form-field-focused]': 'formFieldControl.focused',
    '[class.app-form-field-has-value]': 'formFieldControl.hasValue',
    '[class.app-form-field-full-width]': 'fullWidth',
  },
})
export class AppFormField {
  @Input({ required: true }) variant!: ThemeVariant;
  @Input({ required: true }) color!: ThemeColor;
  @Input({ required: true }) labelOptions!: TextFieldLabelOptions;
  @Input() error!: string;

  /**
   * @summary - Remove max width if needed.
   *
   * @type {boolean}
   */
  @Input({
    transform: booleanAttribute,
  })
  get fullWidth(): boolean {
    return this._fullWidth;
  }

  set fullWidth(value: boolean) {
    this._fullWidth = value;
  }

  private _fullWidth: boolean = false;

  @ContentChild(AppFormFieldControl)
  public formFieldControl!: AppFormFieldControl;

  public get control(): AppFormFieldControl {
    return this.formFieldControl;
  }
}
