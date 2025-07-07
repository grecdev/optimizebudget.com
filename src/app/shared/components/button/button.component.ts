import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

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
  styleUrl: './button.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'btn',
    '[class]': 'classNameHost()',
  },
})
export class ButtonComponent implements ButtonInputs {
  variant = input.required<ThemeVariant>();
  color = input.required<ThemeColor>();
  icon = input<IconPosition>();

  classNameHost = computed<string>(() => {
    const classNameArray = [`btnVariant-${this.variant()} btnColor-${this.color()}`];

    return classNameArray.join(' ');
  });
}
