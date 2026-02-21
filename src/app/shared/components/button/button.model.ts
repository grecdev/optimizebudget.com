import { type ThemeVariant } from '@shared/models/types';

type IconPosition = 'left' | 'right';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

interface ButtonInputs {
  variant: ThemeVariant | null;
  color: ButtonColor;
  icon?: IconPosition | null;
}

export type { ButtonInputs, IconPosition, ButtonColor };
