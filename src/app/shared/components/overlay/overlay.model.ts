import { type EventEmitter } from '@angular/core';

/**
 * @summary - Whatever instances we need to declare in our content components.
 */
interface AppOverlayInstances {
  close: EventEmitter<null>;
}

export type { AppOverlayInstances };
