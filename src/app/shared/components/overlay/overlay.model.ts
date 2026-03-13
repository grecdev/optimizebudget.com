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

/**
 * @summary - Whatever instances we need to declare in our content components.
 */
class AppOverlayContentInstances {
  // Added via overlay service upon creation, for all components that requires the OverlyReference behaviour class.
  overlayReference: OverlayReference | null = null;
}

type ComponentReference =
  | ComponentRef<unknown & AppOverlayContentInstances>
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
};

export { AppOverlayContentInstances };
