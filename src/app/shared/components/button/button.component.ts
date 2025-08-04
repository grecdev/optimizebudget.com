import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { ThemeColor, ThemeVariant } from '@script/types';
import { ButtonInputs, IconPosition } from './button.model';

/**
 * @summary - Button util component
 *
 * @param {ThemeVariant} variant - Button style basically
 * @param {ThemeColor} color - Button color
 * @param {IconPosition} [icon] - If you want to add an icon on the left side of the button (I usually use <FontAwesome /> components)
 *
 * @example Implementation
 *
 * ```
 * <button
 *    type="button"
 *    appButton
 *    variant="basic"
 *    color="white-default"
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
    class: 'btn',
    '[class.app-button-variant-basic]': 'variant === "basic"',
    '[class.app-button-variant-outlined]': 'variant === "outlined"',
    '[class.app-button-variant-contained]': 'variant === "contained"',
    '[class.app-button-color]': 'color === "primary-default"',
  },
})
export class ButtonComponent implements ButtonInputs {
  @Input() variant: ThemeVariant = null;
  @Input() color: ThemeColor = null;
  @Input() icon: IconPosition | undefined = undefined;
}
