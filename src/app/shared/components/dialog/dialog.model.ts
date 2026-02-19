import { type ComponentRef, type EmbeddedViewRef } from '@angular/core';
import { DialogComponent } from '@shared/components/dialog/dialog.component';

/**
 * @summary - Options assigned to dialog's component ref.
 *
 * These properties must be included into the @Component also.
 */
interface DialogOptions {
  title: string;
  closeButton: boolean;
}

interface ComponentReferenceState<T> {
  content: ComponentRef<T> | null;
  dialog: ComponentRef<DialogComponent> | null;
}

export type { ComponentReferenceState, DialogOptions };
