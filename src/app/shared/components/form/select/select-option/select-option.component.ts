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
  @Input({ required: true }) public get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  private _value: string = '';

  constructor(@Inject(APP_SELECT_COMPONENT_REFERENCE) selectRoot: AppSelectComponent) {
    this._selectRoot = selectRoot;
  }

  @HostListener('click', ['$event']) handleClick(event: MouseEvent) {
    event.stopPropagation();

    const TARGET = event.target as HTMLElement;
    const TEXT_CONTENT_ELEMENT = TARGET.querySelector('.text-content');
    const TEXT_CONTENT = TEXT_CONTENT_ELEMENT && TEXT_CONTENT_ELEMENT.textContent;

    if (!this._selectRoot || !TEXT_CONTENT) {
      throw Error('Elements not found!');
    }

    this._selectRoot.handleOptionChange({
      value: this._value,
      textContent: this._value.length > 0 ? TEXT_CONTENT : '',
    });
  }
}
