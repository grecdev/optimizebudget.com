import { Observable } from 'rxjs';

import { CollectionViewer } from './table.model';

/**
 * @summary - When providing a `DataSource` object, the table will use the `Observable` stream provided by
 * the `connect` method and trigger updates when that stream emits a new data array values.
 *
 * @type {T}
 */
export abstract class DataSource<T> {
  /**
   * @summary - Connect a collection viewer (such as table) to this data source.
   *
   * The stream provided will be accessed during change detection and should not directly
   * change values that are bound in template views.
   *
   * @param {CollectionViewer} collectionViewer - The component that exposes a view over the data provided by this data source.
   *
   * @public
   * @returns {Observable<readonly T[]>} - Observable that emits a new value when the data changes.
   */
  public abstract connect(collectionViewer: CollectionViewer): Observable<readonly T[]>;

  /**
   * @summary - Disconnects a collection viewer (such as table) from this data source.
   *
   * Can be used to perform any clean-up or tear-down operations when a view is being destroyed.
   *
   * @param {CollectionViewer} collectionViewer - The component that exposes a view over the data provided by this data source.
   *
   * @public
   * @returns {void}
   */
  public abstract disconnect(collectionViewer: CollectionViewer): void;
}

/**
 * @summary - Check whether the target provided is a `DataSource`.
 *
 * We can check this if the target provided has a `connect` method.
 *
 * @param {T} target - The target we want to check.
 *
 * @public
 * @returns {boolean}
 */
export const isDataSource = (target: any): target is DataSource<any> =>
  target && Object.hasOwn(target, 'connect') && typeof target.connect === 'function';
