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
    '[class]': 'classNameHost',
  },
})
export class ButtonComponent implements ButtonInputs {
  @Input({ required: true }) variant!: ThemeVariant;
  @Input({ required: true }) color!: ThemeColor;
  @Input() icon: IconPosition | undefined = undefined;

  get classNameHost() {
    const classNameArray = [`btnVariant-${this.variant} btnColor-${this.color}`];

    return classNameArray.join(' ');
  }
}
