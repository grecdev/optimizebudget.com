import {
  type ComponentRef,
  type EmbeddedViewRef,
  type EventEmitter,
} from '@angular/core';

/**
 * @summary - Whatever instances we need to declare in our content components.
 */
interface AppOverlayInstances {
  close: EventEmitter<null>;
}

type ComponentReferencesState = Array<
  ComponentRef<unknown & AppOverlayInstances> | EmbeddedViewRef<unknown> | null
>;

export type { AppOverlayInstances, ComponentReferencesState };
