import { type ThemeVariant } from '@shared/models/types';

type IconPosition = 'left' | 'right';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface ButtonInputs {
  variant: ThemeVariant | null;
  color: ButtonColor | null;
  icon?: IconPosition | null;
}

export type { ButtonInputs, IconPosition, ButtonColor };
