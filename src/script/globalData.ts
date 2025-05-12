import { HeaderLink } from '@script/interfaces';
import { ApiEndpoints, RoutesName } from '@script/types';

import { environment } from '@environments/environment';

const allRoutes: Record<RoutesName, HeaderLink> = {
  someRoute: {
    id: 0,
    path: 'https://www.grecu.dev',
    target: '_blank',
    icon: 'some-icon',
    ariaLabel: 'Bla bla bla',
  },
};

const adminData = {
  email: 'some-email',
};

const apiEndpoints: Record<ApiEndpoints, string> = {
  someApi: `${environment.API_URL}/api/someApi`,
};

export { allRoutes, adminData, apiEndpoints };
