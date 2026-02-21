import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { type ThemeVariant } from '@shared/models/types';

import { ButtonInputs, IconPosition, ButtonColor } from './button.model';

/**
 * @summary - Button util component
 *
 * @param {ThemeVariant} variant - Button style basically
 * @param {ButtonColor} color - Button color
 * @param {IconPosition} [icon] - If you want to add an icon on the left side of the button (I usually use <FontAwesome /> components)
 *
 * @example Implementation
 *
 * ```
 * <button
 *    type="button"
 *    appButton
 *    variant="basic"
 *    color="primary"
 *    icon="left">
 *      Hello world!
 * </button>
 * ```
 *
 * @returns An angular component - html button element
 * @public
 */
@Component({
  selector: 'button[appButton], a[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-button',
    '[class]': 'className',

    '[class.app-button-variant-basic]': 'variant === "basic"',
    '[class.app-button-variant-outlined]': 'variant === "outlined"',
    '[class.app-button-variant-contained]': 'variant === "contained"',
  },
})
export class AppButtonComponent implements ButtonInputs {
  @Input() variant: ButtonInputs['variant'] = null;
  @Input() icon: ButtonInputs['icon'] = null;

  get color(): ButtonInputs['color'] {
    return this._color;
  }

  @Input() set color(value: ButtonInputs['color']) {
    this.className = `app-button-color-${value}`;

    this._color = value;
  }

  private _color: ButtonInputs['color'] = 'primary';

  get className(): string {
    return this._className.join(' ');
  }

  set className(value: string) {
    this._className.push(value);
  }

  private _className: string[] = [];
}
