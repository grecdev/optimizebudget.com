import { InjectionToken } from '@angular/core';

import type { _ViewRepeater, _ViewRepeaterItemContext } from './view-repeater.model';

const TABLE = new InjectionToken<any>('TABLE');

export const VIEW_REPEATER_STRATEGY = new InjectionToken<
  _ViewRepeater<unknown, unknown, _ViewRepeaterItemContext<unknown>>
>('_ViewRepeater');

export { TABLE };
