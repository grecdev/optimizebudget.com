import { type ComponentRef, type EmbeddedViewRef, type NgModuleRef } from '@angular/core';

import { type OverlayReference } from './overlay-reference';

interface AppOverlayComponentOptions {
  noBackground: boolean;
}

/**
 * @summary - Whatever instances we need to declare for the overlay component itself.
 */
interface AppOverlayComponentInstances {
  options: AppOverlayComponentOptions;
}

interface OverlayReferenceOptions {
  currentID: number;
}

type ComponentReference =
  | ComponentRef<unknown>
  | EmbeddedViewRef<unknown>
  | NgModuleRef<unknown>
  | null;

type ComponentReferencesState = Array<ComponentReference>;

type OverlayReferenceMapKey<C> = OverlayReference<ComponentRef<C>>;

export type {
  ComponentReferencesState,
  AppOverlayComponentInstances,
  ComponentReference,
  OverlayReferenceMapKey,
  OverlayReferenceOptions,
};
