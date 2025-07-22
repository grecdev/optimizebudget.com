import { ThemeColor, ThemeVariant } from '@script/types';

type IconPosition = 'left' | 'right';

interface ButtonInputs {
  variant: ThemeVariant;
  color: ThemeColor;
  icon?: IconPosition | undefined;
}

export type { ButtonInputs, IconPosition };
