interface HeaderLink {
  id: number;
  path: string;
  target?: '_self' | '_blank';
  textContent?: string;
  icon?: any;
  ariaLabel: string;
}

export type { HeaderLink };
