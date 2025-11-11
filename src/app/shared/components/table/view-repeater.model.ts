/**
 * Code source
 *
 * https://github.com/angular/components/blob/main/src/cdk/collections/view-repeater.ts
 *
 * The term "view repeater strategy" in Angular doesn't have a single, official meaning
 * but generally refers to the different ways Angular handles rendering repeated item in a list,
 * particularly in optimizing performance.
 */

import {
  InjectionToken,
  type IterableChangeRecord,
  type IterableChanges,
  type TemplateRef,
  type ViewContainerRef,
} from '@angular/core';

/**
 * @summary
 *
 * Define a blueprint for the context for an embedded view
 * in the repeater's view container.
 *
 * @template T - The type for the embedded view's $implicit property.
 */
interface _ViewRepeaterItemContext<T> {
  $implicit?: T;
}

/**
 * @summary - The arguments needed to construct an embedded view for an item in a view container.
 *
 * @template C - The type for the context passed to each embedded view.
 */
interface _ViewRepeaterItemInsertArgs<C> {
  templateRef: TemplateRef<C>;
  context?: C;
  index?: number;
}

/**
 * @summary
 *
 * A factory that derives the embedded view context
 * for an item in a view container.
 *
 * @template T - The type for the embedded view's $implicit property.
 * @template R - The type for the item in each IterableDiffer change record.
 * @template C - The type for the context passed to each embedded view.
 */
type _ViewRepeaterItemContextFactory<T, R, C extends _ViewRepeaterItemContext<T>> = (
  record: IterableChangeRecord<R>,
  adjustedPreviousIndex: number | null,
  currentIndex: number | null
) => _ViewRepeaterItemInsertArgs<C>;

/**
 * @summary - Extracts the value of an item from an "IterableChangeRecord".
 *
 * @template T - The type for the embedded view's $implicit property.
 * @template R - The type for the item in each IterableDiffer change record.
 */
type _ViewRepeaterItemValueResolver<T, R> = (record: IterableChangeRecord<R>) => T;

/**
 * @summary - Indicates how a view as changed by a "_ViewRepeater".
 */
enum _ViewRepeaterOperation {
  // The content of an existing view was replaced with another item.
  REPLACED,
  // A new view was created with "createEmbeddedView".
  INSERTED,
  // The position of a view changed, but the content remains the same.
  MOVED,
  // A view was detached from the view container.
  REMOVED,
}

/**
 * @summary
 *
 * Metadata describing the state of a view after it was updated by a "_ViewRepeater".
 *
 * @template R - The type for the item in each IterableDifferRecord.
 * @template C - The type for the context passed to each embedded view.
 */
interface _ViewRepeaterItemChange<R, C> {
  // The view's context after it was changed
  context?: C;
  // Indicates how the view was changed
  operation: _ViewRepeaterOperation;
  // The view's corresponding change record
  record: IterableChangeRecord<R>;
}

/**
 * @summary - Type for a callback to be executed after a view has changed.
 *
 * @template R - The type for the item in each ItemDiffer change record.
 * @template C - The type for the context passed to each embedded view.
 */
type _ViewRepeaterItemChanged<R, C> = (change: _ViewRepeaterItemChange<R, C>) => void;

/**
 * @summary - Describes a strategy for rendering items in a ViewContainerRef.
 *
 * @template T - The type for each embedded view $implicit property.
 * @template R - The type for the item in each IterableDiffer change record.
 * @template C - The type for the context passed to each embedded view.
 */
interface _ViewRepeater<T, R, C extends _ViewRepeaterItemContext<T>> {
  applyChanges(
    changes: IterableChanges<R>,
    viewContainerRef: ViewContainerRef,
    itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C>,
    itemValueResolver: _ViewRepeaterItemValueResolver<T, R>,
    itemViewChanged: _ViewRepeaterItemChange<R, C>
  ): void;

  detach(): void;
}

export const VIEW_REPEATER_STRATEGY = new InjectionToken<
  _ViewRepeater<unknown, unknown, _ViewRepeaterItemContext<unknown>>
>('_ViewRepeater');
