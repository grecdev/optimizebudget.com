interface Route {
  id: number;
  path: string;
  ariaLabel: string;
  textContent?: string;
  target?: '_self' | '_blank';
  icon?: any;
}

interface ClearTimeoutOptions {
  timeout: ReturnType<typeof setTimeout> | null;
}

interface RouteSnapshotData {
  authenticationPage: boolean;
}

export type { Route, ClearTimeoutOptions, RouteSnapshotData };
