import { InputSignal } from '@angular/core';
import { ThemeColor, ThemeVariant } from '@script/types';

type IconPosition = 'left' | 'right';

interface ButtonInputs {
  variant: InputSignal<ThemeVariant>;
  color: InputSignal<ThemeColor>;
  icon?: InputSignal<IconPosition | undefined>;
}

export type { ButtonInputs, IconPosition };
