import {
  type QueryList,
  type IterableChangeRecord,
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  IterableDiffer,
  Output,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  Attribute,
  ElementRef,
  PLATFORM_ID,
  IterableDiffers,
  Input,
  ContentChildren,
} from '@angular/core';

import { isPlatformServer } from '@angular/common';

import { type Subscription } from 'rxjs';

import { _VIEW_REPEATER_STRATEGY, TABLE } from './tokens';

import { _ViewRepeaterStrategy } from './view-repeater-strategy';
import { _ViewRepeaterOperation, type _ViewRepeaterItemInsertArgs } from './view-repeater.model';

import {
  type RenderRow,
  type RowContext,
  type RowOutlet,
  type TableRefElement,
  type TableDataSourceInput,
} from './table.model';

import {
  HeaderRowOutlet,
  DataRowOutlet,
  BaseRowDef,
  CellOutlet,
  HeaderRowDef,
  RowDef,
  FooterRowDef,
} from './row.component';

import { ColumnDef } from './cell.component';

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
  /**
   * @summary - Whether the component is rendered on the server
   *
   * @type {boolean}
   *
   * @private
   */
  protected _isServer: boolean = false;

  /**
   * @type {_ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>}
   *
   * @private
   */
  private readonly _viewRepeater: _ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>;

  /**
   * @type {ChangeDetectorRef}
   *
   * @private
   */
  private readonly _changeDetectorRef: ChangeDetectorRef;

  /**
   * @summary - Emits when the table completes rendering a set of data rows based on the latest data.
   *
   * Even if the set of rows is empty.
   *
   * @type {EventEmitter<void>}
   *
   * @public
   */
  @Output() public readonly contentChanged = new EventEmitter<void>();

  /**
   * @summary - The table's source of data.
   *
   * Which can be provided in three ways:
   *
   * 1) Simple data array (each object represents one table row)
   *
   * If a data array is provided, the table must be notified whenever our data source is modified.
   * This can be done by calling the `renderRows(...)` method, which will render the diff since
   * the last table render.
   *
   * 2) Stream that emits a data array each time the array changes
   *
   * When providing an `Observable` stream, the table will trigger an update automatically
   * when the stream emits a new array of data.
   *
   * 3) `DataSource` object that implements the connect/disconnect interface
   *
   * When providing a `DataSource` object, the table will use the `Observable` stream provided by
   * the `connect` method and trigger updates when that stream emits a new data array values.
   *
   * During the table's `ngOnDestroy` hook or when the data source is removed from the table,
   * the table will call the `DataSource's` disconnect method. (may be useful for cleaning up any
   * subscriptions registered during the connect process).
   *
   * This is also what Angular Material's recommend to use.
   *
   * @type {TableDataSourceInput<T>}
   *
   * @public
   * @returns {TableDataSourceInput<T>}
   */
  @Input() public get dataSource(): TableDataSourceInput<T> {
    return this._dataSource;
  }

  /**
   * @summary - Modify data source from input.
   *
   * @param {TableDataSourceInput<T>} value - Value passed from component
   *
   * @public
   */
  public set dataSource(value: TableDataSourceInput<T>) {
    if (this._dataSource === value) {
      return;
    }

    this._switchDataSource();
  }

  /**
   * @type {TableDataSourceInput<T>}
   *
   * @private
   */
  private _dataSource: TableDataSourceInput<T>;

  /**
   * @summary - The latest data provided by the data source
   *
   * @type {Array<T> | null}
   *
   * @private
   */
  private _data: Array<T> | null = null;

  /**
   * @type {IterableDiffers}
   *
   * @private
   */
  private _differs: IterableDiffers;

  /**
   * @summary - Differ used to find the changes in the data provided by the data source.
   *
   * @type {IterableDiffer<RenderRow<T>> | null}
   *
   * @private
   */
  private _dataDiffer: IterableDiffer<RenderRow<T>> | null = null;

  /**
   * @summary - Subscription that listens for data provided by the data source.
   *
   * @type {Subscription | null}
   *
   * @private
   */
  private _renderChangeSubscription: Subscription | null = null;

  /**
   * @summary - List of rendered rows as identified by their `RenderRow` object.
   *
   * @type {Array<RenderRow<T>>}
   *
   * @private
   */
  private _renderRowsArray: Array<RenderRow<T>> = [];

  /**
   * @summary - Cache of the latest rendered `RenderRow` objects as a map
   * for easy retrieval when constructing a new list.
   *
   * Since the new list is constructed with the cached `RenderRow` objects, the row
   * identity is preserved when data and row template matches, allowing the `IterableDiffer`
   * API to check for reference and understand which rows are added/moved/removed.
   *
   * @type {Map<T, WeakMap<RowDef<T>, RenderRow<T>[]>>}
   *
   * @private
   */
  private _cachedRenderRowsMap = new Map<T, WeakMap<RowDef<T>, Array<RenderRow<T>>>>();

  /**
   * @summary - Stores the row definition that does not have a `when` predicate.
   *
   * @type {RowDef<T> | null}
   *
   * @private
   */
  private _defaultRowDef: RowDef<T> | null = null;

  /**
   * @summary - Set of all header row definitions that can be used by this table.
   *
   * Populated by the header rows gathered by using `ContentChildren`.
   *
   * @type {Array<HeaderRowDef<T>>}
   *
   * @private
   */
  private _headerRowDefs: Array<HeaderRowDef<T>> = [];

  /**
   * @summary - Set of all row definitions that can be used by this table.
   *
   * Populated by the rows gathered by using `ContentChildren`.
   *
   * @type {Array<RowDef<T>>}
   *
   * @private
   */
  private _rowDefs: Array<RowDef<T>> = [];

  /**
   * @summary - Set of all footer row definitions that can be used by this table.
   *
   * Populated by the footer rows gathered by using `ContentChildren`.
   *
   * @type {Array<FooterRowDef<T>>}
   *
   * @private
   */
  private _footerRowDefs: Array<FooterRowDef<T>> = [];

  /**
   * @summary - Set of header row definitions that were provided to the table as content children.
   *
   * @type {QueryList<HeaderRowDef<T>> | null}
   *
   * @private
   */
  @ContentChildren(HeaderRowDef, {
    descendants: true,
  })
  private _contentHeaderRowDefs: QueryList<HeaderRowDef<T>> | null = null;

  /**
   * @summary - Set of row definitions that were provided to the table as content children.
   *
   * @type {QueryList<RowDef<T>> | null}
   *
   * @private
   */
  @ContentChildren(RowDef, {
    descendants: true,
  })
  private _contentRowDefs: QueryList<RowDef<T>> | null = null;

  /**
   * @summary - Set of footer row definitions that were provided to the table as content children.
   *
   * @type {QueryList<FooterRowDef<T>> | null}
   *
   * @private
   */
  @ContentChildren(FooterRowDef, {
    descendants: true,
  })
  private _contentFooterRowDefs: QueryList<FooterRowDef<T>> | null = null;

  /**
   * @summary - Map of all the user's defined columns (header, data, and footer cell template) identified by name.
   *
   * Collection populated by the column definitions gathered by `ContentChildren`.
   *
   * @type {Map<string, ColumnDef>}
   *
   * @private
   */
  private _columnDefsByName = new Map<string, ColumnDef>();

  /**
   * @summary - Whether the header row definition has been changed.
   *
   * Triggers an update to the header row after the content is checked.
   *
   * Initialized as `true` in order to render the initial set of rows.
   *
   * @type {boolean}
   *
   * @private
   */
  private _headerRowDefChanged: boolean = true;

  /**
   * @summary - Whether the footer row definition has been changed.
   *
   * Triggers an update to the footer row after the content is checked.
   *
   * Initialized as `true` in order to render the initial set of rows.
   *
   * @type {boolean}
   *
   * @private
   */
  private _footerRowDefChanged: boolean = true;

  /**
   * @summary - Outlets in the table's template where the header, data rows, and footer will be inserted.
   *
   * @public
   */
  public headerRowOutlet: HeaderRowOutlet | null = null;
  public rowOutlet: DataRowOutlet | null = null;

  constructor(...args: Array<unknown>);

  constructor(
    @Attribute('role') role: string,
    @Inject(_VIEW_REPEATER_STRATEGY)
    viewRepeaterStrategy: _ViewRepeaterStrategy<T, RenderRow<T>, RowContext<T>>,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object,
    differs: IterableDiffers
  ) {
    this._viewRepeater = viewRepeaterStrategy;
    this._changeDetectorRef = changeDetectorRef;

    if (!role && elementRef.nativeElement) {
      elementRef.nativeElement.setAttribute('role', 'table');
    }

    this._isServer = isPlatformServer(platformId);
    this._differs = differs;

    this._dataDiffer = this._differs
      .find([])
      .create((_i: number, dataRow: RenderRow<T>) => dataRow);
  }

  public outletAssigned() {
    // console.log('assign all outlets');
  }

  /**
   * @summary - Update the list of all available row definitions tha can be used.
   *
   * And after all row definitions are determined, find the row
   * definition to be considered default.
   *
   * @private
   * @returns {void}
   */
  private _cacheRowDefs(): void {
    this._headerRowDefs = this._getOwnDefs(this._contentHeaderRowDefs);
    this._rowDefs = this._getOwnDefs(this._contentRowDefs);
    this._footerRowDefs = this._getOwnDefs(this._contentFooterRowDefs);

    const DEFAULT_ROW_DEFS = this._rowDefs.filter(item => !item.when);

    if (DEFAULT_ROW_DEFS.length > 0) {
      throw Error(
        'Only one row without `when` predicate is allowed\nOr maybe you need to have a `multiTemplateDataRows` table.'
      );
    }

    this._defaultRowDef = DEFAULT_ROW_DEFS[0];
  }

  /**
   * @summary - Get the matching row definitions that should be used for this row data.
   *
   * If there is only one row definition, return it. Otherwise, find the row definitions that has a
   * `when` predicate that return true with the data.
   *
   * If none return true, then return the default row definition
   *
   * @param {T} data - Item from data object
   * @param {number} dataIndex - Data's index
   *
   * @private
   * @returns {Array<RowDef<T>>}
   */
  private _getRowDefs(data: T, dataIndex: number): Array<RowDef<T>> {
    if (this._rowDefs.length > 0) {
      return [this._rowDefs[0]];
    }

    const ROW_DEFS: Array<RowDef<T>> = [];

    const ROW_DEF_ITEM =
      this._rowDefs.find(item => item.when && item.when(data, dataIndex)) ?? this._defaultRowDef;

    if (ROW_DEF_ITEM) {
      ROW_DEFS.push(ROW_DEF_ITEM);
    }

    if (ROW_DEFS.length === 0) {
      throw Error('Row definitions has no data!');
    }

    return ROW_DEFS;
  }

  /**
   * @summary - Get a list of `RenderRow<T> for the provided data object.
   *
   * And also get any `RowDef` objects that should be rendered for this data.
   *
   * Reuse the cached `RenderRow<T>` objects if they match the same data object
   * and row template pair.
   *
   * @param {T} data - The data source
   * @param {number} dataIndex - The item's index
   * @param {WeakMap<RowDef<T>, Array<RenderRow<T>>>} [cache] - Cache with all row definitions
   *
   * @private
   * @returns {Array<RenderRow<T>>}
   */
  private _getRenderRowsForData(
    data: T,
    dataIndex: number,
    cache?: WeakMap<RowDef<T>, Array<RenderRow<T>>>
  ): Array<RenderRow<T>> {
    const ROW_DEFS = this._getRowDefs(data, dataIndex);

    const RENDER_ROWS_FOR_DATA = ROW_DEFS.map(item => {
      const CACHE_RENDER_ROWS = cache && cache.has(item) ? cache.get(item) : [];
      const CACHED_ROW = CACHE_RENDER_ROWS && CACHE_RENDER_ROWS.length && CACHE_RENDER_ROWS.shift();

      if (CACHED_ROW) {
        CACHED_ROW.dataIndex = dataIndex;

        return CACHED_ROW;
      }

      return {
        data,
        rowDef: item,
        dataIndex,
      };
    });

    return RENDER_ROWS_FOR_DATA;
  }

  /**
   * @summary - Get the list of `RenderRow` objects to render according
   * to the current list of data and defined row definitions.
   *
   * If the previous list already contained a particular pair, it should be reused
   * so that the differ equates their references.
   *
   * @private
   * @returns {Array<RenderRow<T>>}
   */
  private _getAllRenderRows() {
    const RENDER_ROWS: Array<RenderRow<T>> = [];
    const PREV_CACHED_RENDER_ROWS = this._cachedRenderRowsMap;

    this._cachedRenderRowsMap = new Map();

    if (!this._data) {
      return RENDER_ROWS;
    }

    for (let i = 0; i < this._data.length; i++) {
      const ITEM = this._data[i];

      const RENDER_ROWS_FOR_DATA = this._getRenderRowsForData(
        ITEM,
        i,
        PREV_CACHED_RENDER_ROWS.get(ITEM)
      );

      if (!this._cachedRenderRowsMap.has(ITEM)) {
        this._cachedRenderRowsMap.set(ITEM, new WeakMap());
      }

      for (let j = 0; j < RENDER_ROWS_FOR_DATA.length; j++) {
        const INNER_ITEM = RENDER_ROWS_FOR_DATA[j];
        const CACHED_ITEM = this._cachedRenderRowsMap.get(INNER_ITEM.data);

        if (!CACHED_ITEM) {
          break;
        }

        if (CACHED_ITEM.has(INNER_ITEM.rowDef)) {
          CACHED_ITEM.get(INNER_ITEM.rowDef)!.push(INNER_ITEM);
        } else {
          CACHED_ITEM.set(INNER_ITEM.rowDef, [INNER_ITEM]);
        }

        RENDER_ROWS.push(INNER_ITEM);
      }

      return RENDER_ROWS;
    }

    return RENDER_ROWS;
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

  /**
   * @summary - Get the column definitions for the provided row definition
   *
   * @param {BaseRowDef} rowDef - Row definition
   *
   * @private
   * @returns {Array<TemplateRef<TableRefElement>>}
   */
  private _getCellTemplates(rowDef: BaseRowDef): Array<TemplateRef<TableRefElement>> {
    if (!rowDef || !rowDef.columns) {
      return [];
    }

    const CELL_TEMPLATES = Array.from(rowDef.columns, item => {
      const COLUMN = this._columnDefsByName.get(item);
      const TEMPLATE = COLUMN && rowDef.extractCellTemplate(COLUMN);

      if (!TEMPLATE) {
        throw Error(`Could not find column ${item}`);
      }

      return TEMPLATE;
    });

    return CELL_TEMPLATES;
  }

  /**
   * @summary - Create an embedded view for the cell outlet
   *
   * @param {BaseRowDef} rowDef - Row definition
   * @param {RowContext<T>} context - Row context
   *
   * @private
   * @returns {void}
   */
  private _renderCellTemplateForItem(rowDef: BaseRowDef, context: RowContext<T>): void {
    const CELL_TEMPLATES = this._getCellTemplates(rowDef);

    for (const ITEM of CELL_TEMPLATES) {
      if (!CellOutlet.mostRecentCellOutlet || !CellOutlet.mostRecentCellOutlet.viewContainerRef) {
        break;
      }

      CellOutlet.mostRecentCellOutlet.viewContainerRef.createEmbeddedView(
        ITEM,
        context as TableRefElement
      );
    }

    this._changeDetectorRef.markForCheck();
  }

  /**
   * @summary - Update the meta context of a rows' context data (index, count, first, last, etc.).
   *
   * @private
   * @returns {void}
   */
  private _updateRowIndexContext(): void {
    if (!this.rowOutlet) {
      return;
    }

    const VIEW_CONTAINER = this.rowOutlet.viewContainer;
    const COUNT = VIEW_CONTAINER.length - 1;

    for (let renderIndex = 0; renderIndex <= COUNT; renderIndex++) {
      const VIEW_REF = VIEW_CONTAINER.get(renderIndex) as RowViewRef<T>;
      const CONTEXT = VIEW_REF.context as RowContext<T>;

      Object.assign(CONTEXT, {
        count: COUNT,
        first: renderIndex === 0,
        last: renderIndex === COUNT,
        even: renderIndex % 2 === 0,
        odd: !CONTEXT.even,
        index: this._renderRowsArray[renderIndex].dataIndex,
      });
    }
  }

  /**
   * @summary - Creates a new row template in the outlet and fills it
   * with the set of cell templates.
   *
   * Optionally takes a context to provide to the row and cells, as well as
   * an index of where to place the new row template in the outlet.
   *
   * @param {RowOutlet} outlet - Row outlet directive where we embed the view
   * @param {BaseRowDef} rowDef - Row definition
   * @param {number} index
   * @param {RowContext<T>} context
   *
   * @private
   * @returns {EmbeddedViewRef<TableRefElement>}
   */
  private _renderRow(
    outlet: RowOutlet,
    rowDef: BaseRowDef,
    index: number,
    context: RowContext<T>
  ): EmbeddedViewRef<TableRefElement> {
    const VIEW = outlet.viewContainer.createEmbeddedView(
      rowDef.template,
      context as TableRefElement,
      index
    );

    this._renderCellTemplateForItem(rowDef, context);

    return VIEW;
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
  renderRows(): void {
    if (!this.rowOutlet) {
      return;
    }

    this._renderRowsArray = this._getAllRenderRows();

    const CHANGES = this._dataDiffer && this._dataDiffer.diff(this._renderRowsArray);

    if (!CHANGES) {
      this.contentChanged.next();
      return;
    }

    const VIEW_CONTAINER_REF = this.rowOutlet.viewContainer;

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
          this._renderCellTemplateForItem(change.record.item.rowDef, change.context);
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

  /**
   * @summary - Renders the table if its state has been changed
   *
   * @private
   * @returns {void}
   */
  private _render(): void {
    this._cacheRowDefs();
    this._cacheColumnDefs();

    if (
      this._rowDefs.length === 0 &&
      this._headerRowDefs.length === 0 &&
      this._footerRowDefs.length === 0
    ) {
      throw Error('Table is missing row definitions!');
    }

    if (this._headerRowDefChanged) {
      this._forceRenderHeaderRows();
      this._headerRowDefChanged = false;
    }

    if (this._footerRowDefChanged) {
      this._forceRenderFooterRows();
      this._footerRowDefChanged = false;
    }

    if (!this._dataSource || this._rowDefs.length === 0 || this._renderChangeSubscription) {
      return;
    }

    this._observeRenderChanges();
  }
}
