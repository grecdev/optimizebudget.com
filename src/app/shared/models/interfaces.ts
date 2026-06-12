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

export type { Route, ClearTimeoutOptions };
