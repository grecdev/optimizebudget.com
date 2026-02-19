import { type ComponentRef, type EmbeddedViewRef } from '@angular/core';

interface ComponentReferenceReturn<T> {
  COMPONENT_REFERENCE: ComponentRef<T>;
  ROOT_NODES: EmbeddedViewRef<T>['rootNodes'];
}

/**
 * @summary - Options assigned to dialog's component ref.
 *
 * These properties must be included into the @Component also.
 */
interface DialogOptions {
  title: string;
  closeButton: boolean;
}

export type { ComponentReferenceReturn, DialogOptions };
