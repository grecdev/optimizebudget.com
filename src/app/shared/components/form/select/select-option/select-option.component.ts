import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { APP_SELECT_COMPONENT_REFERENCE } from '../select.tokens';

import { type AppSelectComponent } from '../select.component';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-select-option',
  },
})
export class AppSelectOptionComponent {
  /**
   * @summary - Accessing parent root data.
   *
   * @type {AppSelectComponent}
   *
   * @private
   */
  private _selectRoot: AppSelectComponent;

  /**
   * @summary - Option's current value
   *
   * @type {string}
   *
   * @public
   */
  @Input({ required: true }) get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  _value: string = '';

  constructor(@Inject(APP_SELECT_COMPONENT_REFERENCE) selectRoot: AppSelectComponent) {
    this._selectRoot = selectRoot;
  }

  @HostListener('click', ['$event']) handleClick(event: MouseEvent) {
    event.stopPropagation();

    if (!this._selectRoot) {
      throw Error('Parent element not found!');
    }

    this._selectRoot.handleOptionChange(this._value);
  }
}
