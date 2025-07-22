import { Directive, Input } from '@angular/core';

import { AppFormFieldControl } from '../form-field/form-field-control';

@Directive({
  selector: 'input[appInput], textarea[appInput]',
  providers: [
    {
      // Alias AppFormFieldControl w/ reference to AppInput
      provide: AppFormFieldControl,
      useExisting: AppInput,
    },
  ],
  host: {
    class: 'app-input',
    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)',
  },
})
export class AppInput implements AppFormFieldControl {
  focused: boolean = false;

  @Input()
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  protected _id: string = '';

  _focusChanged(isFocused: boolean): void {
    if (isFocused === this.focused) {
      return;
    }

    this.focused = isFocused;
  }
}
