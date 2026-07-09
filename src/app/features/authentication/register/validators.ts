import { type AbstractControl, type ValidationErrors } from '@angular/forms';
import { InputTypes } from './register.model';

function confirmPasswordValidator() {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const ERROR_KEY = 'passwordMismatch';

    const PASSWORD_CONTROL = formGroup.get(InputTypes.PASSWORD);
    const CONFIRM_PASSWORD_CONTROL = formGroup.get(InputTypes.CONFIRM_PASSWORD);

    if (!PASSWORD_CONTROL || !CONFIRM_PASSWORD_CONTROL) {
      return null;
    }

    if (CONFIRM_PASSWORD_CONTROL.errors && !CONFIRM_PASSWORD_CONTROL.errors[ERROR_KEY]) {
      return null;
    }

    if (PASSWORD_CONTROL.value !== CONFIRM_PASSWORD_CONTROL.value) {
      const ERROR_DATA = {
        [ERROR_KEY]: true,
      };

      CONFIRM_PASSWORD_CONTROL.setErrors(ERROR_DATA);

      return ERROR_DATA;
    }

    CONFIRM_PASSWORD_CONTROL.setErrors(null);

    return null;
  };
}

export { confirmPasswordValidator };
