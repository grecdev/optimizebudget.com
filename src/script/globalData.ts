import { HeaderLink } from '@script/interfaces';
import { ApiEndpoints, RoutesName } from '@script/types';

import { environment } from '@environments/environment';

const allRoutes: Record<RoutesName, HeaderLink> = {
  login: {
    id: 0,
    path: 'login',
    target: '_blank',
    ariaLabel: 'Login page path',
  },
};

const adminData = {
  email: 'some-email',
};

const apiEndpoints: Record<ApiEndpoints, string> = {
  someApi: `${environment.SOME_VARIABLE}/api/someApi`,
};

export { allRoutes, adminData, apiEndpoints };
