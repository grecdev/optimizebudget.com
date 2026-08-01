import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RegexPatterns } from '@shared/models/interfaces';

import { regexPatterns } from '@script/globalData';

@Component({
  selector: 'app-password-requirement-container',
  templateUrl: './password-requirement-container.component.html',
  styleUrls: ['./password-requirement-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRequirementContainerComponent {
  /**
   * @summary - Used to validate the form UI.
   *
   * @type {RegexPatterns}
   *
   * @public
   * @readonly
   */
  public readonly regexPatterns: RegexPatterns = regexPatterns;

  /**
   * @summary - Value to check for regex.
   *
   * @type {string}
   *
   * @publics
   */
  @Input({ required: true }) public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  private _password: string = '';
}
