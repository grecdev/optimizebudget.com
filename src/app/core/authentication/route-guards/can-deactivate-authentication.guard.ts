import { CanDeactivateFn } from '@angular/router';

// false - Prevents from leaving the current page.
// true - continue to the next page.
export const canDeactivateAuthenticationGuard: CanDeactivateFn<void> = (component, currentRoute, currentState, nextState) => {
  return false;
};
