import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  type IterableChangeRecord,
  IterableDiffer,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { HeaderRowOutlet, DataRowOutlet } from '@shared/components/table/row.component';

import { _VIEW_REPEATER_STRATEGY, TABLE } from './tokens';

import { _ViewRepeaterStrategy } from './view-repeater-strategy';
import { _ViewRepeaterOperation, type _ViewRepeaterItemInsertArgs } from './view-repeater.model';

import { type RenderRow, type RowContext } from './table.model';

/**
 * @summary - This class is used to define the type for embedded view ref for rows with context.
 */
abstract class RowViewRef<T> extends EmbeddedViewRef<RowContext<T>> {}

@Component({
  selector: 'table[app-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TABLE,
      useExisting: TableComponent,
    },
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _ViewRepeaterStrategy,
    },
  ],
})
export class TableComponent<T> {
  protected readonly _viewRepeater: _ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>;

  /**
   * @summary - Emits when the table completes rendering a set of data rows based on the latest data.
   *
   * Even if the set of rows is empty.
   *
   * @public
   */
  @Output() public readonly contentChanged = new EventEmitter<void>();

  /**
   * @summary - List of rendered rows as identified by their `RenderRow` object.
   *
   * @private
   */
  private _renderRows: Array<RenderRow<T>> = [];

  /**
   * @summary - Differ used to find the changes in the data provided by the data source.
   *
   * @private
   */
  private _dataDiffer: IterableDiffer<RenderRow<T>> | null = null;

  // Outlets in the table's template where the header, data rows, and footer will be inserted.
  public headerRowOutlet: HeaderRowOutlet | null = null;
  public _rowOutlet: DataRowOutlet | null = null;

  constructor(...args: Array<unknown>);

  constructor(
    @Inject(_VIEW_REPEATER_STRATEGY)
    viewRepeaterStrategy: _ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>
  ) {
    this._viewRepeater = viewRepeaterStrategy;
  }

  public outletAssigned() {
    console.log('assign all outlets');
  }

  private _getAllRenderRows() {
    return [];
  }

  /**
   * @summary - Factory function to construct an embedded view for an item in a view container
   *
   * @param {RenderRow<T>} renderRow - Identity of a single rendered row
   * @param {number} index - Index of embedded view
   *
   * @private
   * @returns {_ViewRepeaterItemInsertArgs<RowContext<T>>}
   */
  private _getEmbeddedViewArgs(
    renderRow: RenderRow<T>,
    index: number
  ): _ViewRepeaterItemInsertArgs<RowContext<T>> {
    const ROW_DEF = renderRow.rowDef;

    const CONTEXT: RowContext<T> = {
      $implicit: renderRow.data,
    };

    return {
      templateRef: ROW_DEF.template as TemplateRef<RowContext<T>>,
      context: CONTEXT,
      index,
    };
  }

  private _renderCellTemplateForItem() {
    return null;
  }

  /**
   * @summary - Update the meta context of a rows' context data (index, count, first, last, etc.).
   *
   * @private
   */
  private _updateRowIndexContext() {
    return null;
  }

  /**
   * @summary - Render rows based on a set of data.
   *
   * This set of data is either provided directly as an input array
   * or retrieved through an Observable stream (directly from a DataSource).
   *
   * Checks for differences in the data since the last diff to perform only
   * the necessary changes.
   *
   * If the table's data source is a DataSource or Observable, this `renderRows()`
   * method will be invoked automatically each time the provided Observable emits a new
   * data array.
   *
   * Otherwise, if your data is an array, this method will need to be called manually
   * in our table component to render any changes.
   *
   * @public
   * @returns {void}
   */
  renderRows() {
    if (!this._rowOutlet) {
      return;
    }

    this._renderRows = this._getAllRenderRows();

    const CHANGES = this._dataDiffer && this._dataDiffer.diff(this._renderRows);

    if (!CHANGES) {
      this.contentChanged.next();
      return;
    }

    const VIEW_CONTAINER_REF = this._rowOutlet.viewContainer;

    this._viewRepeater.applyChanges(
      CHANGES,
      VIEW_CONTAINER_REF,
      (
        record: IterableChangeRecord<RenderRow<T>>,
        _adjustedPreviousIndex: number | null,
        currentIndex: number | null
      ) => {
        if (currentIndex === null) {
          return null;
        }

        return this._getEmbeddedViewArgs(record.item, currentIndex);
      },
      record => record.item.data,
      change => {
        if (change.operation === _ViewRepeaterOperation.INSERTED && change.context) {
          this._renderCellTemplateForItem();
        }
      }
    );

    this._updateRowIndexContext();

    CHANGES.forEachIdentityChange(record => {
      if (!record.currentIndex) {
        return;
      }

      const ROW_VIEW = VIEW_CONTAINER_REF.get(record.currentIndex) as RowViewRef<T>;

      ROW_VIEW.context.$implicit = record.item.data;
    });

    this.contentChanged.next();
  }
}
