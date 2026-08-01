import { type RoutesName } from '@shared/models/types';
import { type RegexPatterns, type Route } from '@shared/models/interfaces';

const allRoutes: Record<RoutesName, Route> = {
  overview: {
    id: 0,
    path: '',
    textContent: 'Overview',
    ariaLabel: 'Overview page path',
  },
  login: {
    id: 1,
    path: 'login',
    ariaLabel: 'Login page path',
  },
  register: {
    id: 2,
    path: 'register',
    ariaLabel: 'Register page path',
  },
  resetPassword: {
    id: 3,
    path: 'reset-password',
    ariaLabel: 'Reset password page path',
  },
  expenses: {
    id: 4,
    path: 'expenses',
    textContent: 'Expenses',
    ariaLabel: 'Expenses page path',
  },
  profitAndLoss: {
    id: 5,
    path: 'profit-and-loss',
    textContent: 'Profit and Loss',
    ariaLabel: 'Profit and Loss path',
  },
  goals: {
    id: 6,
    path: 'goals',
    textContent: 'Goals',
    ariaLabel: 'Goals path',
  },
  resetPasswordUser: {
    id: 7,
    path: 'reset-password-user',
    textContent: 'Reset Password',
    ariaLabel: 'Reset password for user path',
  },
  confirmEmail: {
    id: 7,
    path: 'confirm-email',
    textContent: 'Confirm Email',
    ariaLabel: 'Confirm email for user',
  },
};

const adminData = {
  email: 'some-email',
};

/**
 * @summary - Used to validate the form UI.
 *
 * @type {RegexPatterns}
 */
const regexPatterns: RegexPatterns = {
  specialCharacters: /[$%&_@!]/,
  numbers: /\d/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  lengthLimit: /^.{5,15}$/,
  password: /^(?=.*[$%&_@!])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d$%&_@!]{5,15}$/,
  fullName: /^[aA-zZ\-\ ]{1,}$/,
};

// const apiEndpoints: Record<ApiEndpoints, string> = {
//   someApi: `${environment.SOME_VARIABLE}/api/someApi`,
// };

export { allRoutes, adminData, regexPatterns };
