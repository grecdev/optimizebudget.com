import { environment } from '@environments/environment';

import { type ApiEndpoints, type RoutesName } from '@shared/models/types';
import { type Route } from '@shared/models/interfaces';

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
  forgotPassword: {
    id: 3,
    path: 'forgot-password',
    ariaLabel: 'Forgot password page path',
  },
};

const adminData = {
  email: 'some-email',
};

const apiEndpoints: Record<ApiEndpoints, string> = {
  someApi: `${environment.SOME_VARIABLE}/api/someApi`,
};

export { allRoutes, adminData, apiEndpoints };
