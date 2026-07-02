import { CanActivateFn } from '@angular/router';

// false - Block the user from accessing the page.
// true - Let the user access the page.
export const canActivateAuthenticationGuard: CanActivateFn = (route, state) => {
  return true;
};
