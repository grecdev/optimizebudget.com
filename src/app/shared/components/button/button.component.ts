import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { ThemeVariant } from '@script/types';
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
export class ButtonComponent implements ButtonInputs {
  @Input() variant: ThemeVariant = null;
  @Input() icon: IconPosition | undefined = undefined;

  get color(): ButtonColor {
    return this._color;
  }

  @Input() set color(value: ButtonColor) {
    this.className = `app-button-color-${value}`;

    this._color = value;
  }

  private _color: ButtonColor = 'primary';

  get className(): string {
    return this._className.join(' ');
  }

  set className(value: string) {
    this._className.push(value);
  }

  private _className: string[] = [];
}
