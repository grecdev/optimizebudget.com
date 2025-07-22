import { Directive } from '@angular/core';

@Directive()
export abstract class AppFormFieldControl {
  /** The element ID for this control. */
  readonly id: string = '';

  /** Whether the control is focused. */
  readonly focused: boolean = false;
}
