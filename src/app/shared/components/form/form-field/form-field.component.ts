import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  ElementRef,
  ContentChild,
  ViewChild,
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
    '[class.app-form-field-variant-outline]': 'variant === "outlined"',
    '[class.app-form-field-focused]': '_formFieldControl.focused',
  },
})
export class AppFormField {
  @Input({ required: true }) variant!: ThemeVariant;
  @Input({ required: true }) color!: ThemeColor;
  @Input({ required: true }) labelOptions!: TextFieldLabelOptions;
  @Input() error!: string;

  @ViewChild('appLabel') appLabel: ElementRef<HTMLElement> | undefined;

  @ContentChild(AppFormFieldControl)
  _formFieldControl!: AppFormFieldControl;

  get _control(): AppFormFieldControl {
    return this._formFieldControl;
  }
}
