type RoutesName = 'login' | 'register' | 'forgotPassword';

// Make sure these values match $theme-variant and vice versa
type ThemeVariant = null | 'basic' | 'contained' | 'outlined';

// Make sure these values match $spacing and vice versa
type ThemeSpacing = 'sm' | 'default' | 'md' | 'lg';

// Make sure these values match $color-palette and vice versa
type ThemeColor =
  | 'primary-default'
  | 'primary-variant-2'
  | 'primary-variant-3'
  | 'secondary-default'
  | 'secondary-variant-2'
  | 'secondary-variant-3'
  | 'gray-default'
  | 'gray-variant-2'
  | 'white-default'
  | 'black-default';

type ApiEndpoints = 'someApi';

export type { RoutesName, ThemeVariant, ThemeSpacing, ThemeColor, ApiEndpoints };
