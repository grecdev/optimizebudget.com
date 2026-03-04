import { ComponentRef, EmbeddedViewRef } from '@angular/core';

import { AppOverlayInstances } from '../overlay/overlay.model';

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
    | ComponentRef<T & AppOverlayInstances>
    | EmbeddedViewRef<T>
    | null;
  dialogRootComponent: ComponentRef<AppDialogComponent> | null;
}

export type { AppDialogOptions, ComponentReferencesState };
