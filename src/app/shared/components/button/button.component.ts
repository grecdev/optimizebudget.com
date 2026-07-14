import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { type ButtonInputs } from './button.model';

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

    '[class.app-button-loading]': '_loading',
  },
})
export class AppButtonComponent implements ButtonInputs {
  @Input() variant: ButtonInputs['variant'] = 'basic';
  @Input() icon: ButtonInputs['icon'] = null;

  @Input() set color(value: ButtonInputs['color']) {
    this.className = `app-button-color-${value}`;

    this._color = value;
  }

  get color(): ButtonInputs['color'] {
    return this._color;
  }

  private _color: ButtonInputs['color'] = null;

  /**
   * @summary - Loading state.
   *
   * @type {boolean}
   *
   * @public
   */
  @Input() public get loading(): boolean {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  public _loading: boolean = false;

  /**
   * @summary - Class name builder.
   *
   * @param {string} value - Custom class name.
   *
   * @returns {string}
   */
  get className(): string {
    return this._className.join(' ');
  }

  set className(value: string) {
    this._className.push(value);
  }

  private _className: string[] = [];
}
