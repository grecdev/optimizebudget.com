import { type ComponentRef, type EmbeddedViewRef, type NgModuleRef } from '@angular/core';

import { type OverlayReference } from './overlay-reference';
import { type AppOverlayComponent } from './overlay.component';

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
interface AppOverlayContentInstances {
  // Added via overlay service upon creation, for all components that requires the OverlyReference behaviour class.
  overlayReference: OverlayReference | null;
}

interface AppendOverlayOptions<C> extends Pick<AppendToDOMOptions, 'targetDOM'> {
  projectableNodes: EmbeddedViewRef<C>['rootNodes'];
  contentReferences: ComponentReferencesState;
  instanceOptions: AppOverlayComponentInstances['options'];
}

interface SetReferenceInstancesOptions {
  overlayComponentReference: ComponentRef<AppOverlayComponent>;
  contentReferences: ComponentReferencesState;
  instanceOptions?: AppOverlayComponentInstances['options'];
}

interface SaveOverlayReferenceOptions {
  contentReferences: ComponentReferencesState;
}

interface AppendToDOMOptions {
  hostView: EmbeddedViewRef<AppOverlayComponent>;
  targetDOM?: HTMLElement;
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
  AppOverlayContentInstances,
  SetReferenceInstancesOptions,
  AppendOverlayOptions,
  SaveOverlayReferenceOptions,
  AppendToDOMOptions,
};
