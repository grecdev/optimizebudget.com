import { Route } from '@script/interfaces';
import { ApiEndpoints, RoutesName } from '@script/types';

import { environment } from '@environments/environment';

const allRoutes: Record<RoutesName, Route> = {
  login: {
    id: 0,
    path: 'login',
    ariaLabel: 'Login page path',
  },
  register: {
    id: 1,
    path: 'register',
    ariaLabel: 'Register page path',
  },
  forgotPassword: {
    id: 1,
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
