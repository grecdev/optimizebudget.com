import { type ThemeVariant } from '@shared/models/types';

type IconPosition = 'left' | 'right';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

interface ButtonInputs {
  variant: ThemeVariant;
  color: ButtonColor;
  icon?: IconPosition | undefined;
}

export type { ButtonInputs, IconPosition, ButtonColor };
