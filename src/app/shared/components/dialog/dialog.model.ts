import { type ComponentRef, type EmbeddedViewRef } from '@angular/core';

interface ComponentReferenceReturn<T> {
  COMPONENT_REFERENCE: ComponentRef<T>;
  ROOT_NODES: EmbeddedViewRef<T>['rootNodes'];
}

export type { ComponentReferenceReturn };
