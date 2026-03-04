import { type ComponentRef, type EmbeddedViewRef, type NgModuleRef } from '@angular/core';

import { type AppOverlayContentInstances } from '../overlay/overlay.model';

import { AppDialogComponent } from './dialog.component';

/**
 * @summary - Options assigned to dialog's component ref.
 *
 * Component that's using these interface needs to implement it.
 */
interface AppDialogOptions {
  title: string;
  closeButton: boolean;
}

interface ComponentReferencesState<T> {
  dialogProjectedContent:
    | ComponentRef<T & AppOverlayContentInstances>
    | EmbeddedViewRef<T>
    | null;
  dialogRootComponent: ComponentRef<AppDialogComponent> | null;
  contentModuleRef: NgModuleRef<T> | null;
  dialogModuleRef: NgModuleRef<T> | null;
}

export type { AppDialogOptions, ComponentReferencesState };
