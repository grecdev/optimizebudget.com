/**
 * Code source
 *
 * https://github.com/angular/components/blob/main/src/cdk/collections/dispose-view-repeater-strategy.ts
 */

import {
  type EmbeddedViewRef,
  type IterableChangeRecord,
  type IterableChanges,
  type ViewContainerRef,
} from '@angular/core';

import {
  type _ViewRepeater,
  type _ViewRepeaterItemChanged,
  type _ViewRepeaterItemContext,
  type _ViewRepeaterItemContextFactory,
  type _ViewRepeaterItemValueResolver,
  _ViewRepeaterOperation,
} from './view-repeater.model';

/**
 * @summary
 *
 * A repeater that destroys views when they are removed from a `ViewContainerRef`.
 * When new items are inserted into the container, the repeat will always construct
 * a new embedded view for each item.
 *
 * @template T - The type for the embedded view's $implicit property.
 * @template R - The type for the item in each `IterableDiffer` change record.
 * @template C - The type for the context passed to each embedded view.
 */
class _ViewRepeaterStrategy<T, R, C extends _ViewRepeaterItemContext<T>>
  implements _ViewRepeater<T, R, C>
{
  applyChanges(
    changes: IterableChanges<R>,
    viewContainerRef: ViewContainerRef,
    itemContextFactory: _ViewRepeaterItemContextFactory<T, R, C> | undefined,
    itemValueResolver: _ViewRepeaterItemValueResolver<T, R>,
    itemViewChanged?: _ViewRepeaterItemChanged<R, C>
  ) {
    changes.forEachOperation(
      (
        record: IterableChangeRecord<R>
        // previousIndex: number | null,
        // currentIndex: number | null
      ) => {
        let view: EmbeddedViewRef<C> | undefined;
        let operation: _ViewRepeaterOperation | null = null;

        const ITEM_CONTEXT_FACTORY =
          itemContextFactory &&
          itemContextFactory(record, record.previousIndex, record.currentIndex);

        if (record.previousIndex === null && record.currentIndex !== null && ITEM_CONTEXT_FACTORY) {
          operation = _ViewRepeaterOperation.INSERTED;

          view = viewContainerRef.createEmbeddedView(
            ITEM_CONTEXT_FACTORY.templateRef,
            ITEM_CONTEXT_FACTORY.context,
            ITEM_CONTEXT_FACTORY.index
          );
        }

        if (record.currentIndex === null && record.previousIndex !== null) {
          operation = _ViewRepeaterOperation.REMOVED;

          viewContainerRef.remove(record.previousIndex); // Of course, previousIndex will always be a number here.
        }

        if (record.currentIndex !== null && record.previousIndex !== null) {
          operation = _ViewRepeaterOperation.MOVED;

          view = viewContainerRef.get(record.previousIndex) as EmbeddedViewRef<C>;

          viewContainerRef.move(view, record.currentIndex);
        }

        if (!itemViewChanged || !operation) {
          return;
        }

        itemViewChanged({
          record,
          context: view?.context,
          operation,
        });
      }
    );
  }

  detach() {}
}

export { _ViewRepeaterStrategy };
