import { Pipe, PipeTransform } from '@angular/core';

import { type PasswordRequirementValidatorPipeOptions } from './password-requirement-validator.model';

@Pipe({
  name: 'passwordRequirementType',
})
export class PasswordRequirementValidatorPipe implements PipeTransform {
  /**
   * @summary - Check if the regular expression is valid.
   *
   * If true then VALID.
   *
   * @param {PasswordRequirementValidatorPipeOptions} options - Pipe's options.
   *
   * @public
   * @returns {boolean}
   */
  public transform(options: PasswordRequirementValidatorPipeOptions): boolean {
    const { value, regularExpression } = options;

    if (!value) {
      return false;
    }

    const MATCHES = value.match(regularExpression);

    return MATCHES ? MATCHES.length > 0 : false;
  }
}
