interface Route {
  id: number;
  path: string;
  ariaLabel: string;
  textContent?: string;
  target?: '_self' | '_blank';
  icon?: any;
}

export type { Route };
