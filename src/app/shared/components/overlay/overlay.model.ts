import {
  type ComponentRef,
  type EmbeddedViewRef,
  type EventEmitter,
  type NgModuleRef,
} from '@angular/core';

/**
 * @summary - Whatever instances we need to declare in our content components.
 */
interface AppOverlayContentInstances {
  close: EventEmitter<null>;
}

interface AppOverlayComponentOptions {
  noBackground: boolean;
}

/**
 * @summary - Whatever instances we need to declare for the overlay component itself.
 */
interface AppOverlayComponentInstances {
  options: AppOverlayComponentOptions;
}

type ComponentReference =
  | ComponentRef<unknown & AppOverlayContentInstances>
  | EmbeddedViewRef<unknown>
  | NgModuleRef<unknown>
  | null;

type ComponentReferencesState = Array<ComponentReference>;

export type {
  AppOverlayContentInstances,
  ComponentReferencesState,
  AppOverlayComponentInstances,
  ComponentReference,
};
