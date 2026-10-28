import { Injectable } from '@angular/core';

import {
  type SupabaseClient,
  type PostgrestQueryBuilder,
  type PostgrestFilterBuilder,
  createClient,
} from '@supabase/supabase-js';

import { environment } from '@environments/environment';
import { TableNames } from '@shared/models/enums';

import { type InsertOptions } from './supabase.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  /**
   * @summary - Expose only the auth API.
   *
   * @type {SupabaseClient['auth']}
   *
   * @public
   * @readonly
   */
  public readonly auth: SupabaseClient['auth'];

  /**
   * @summary - Main supabase API.
   *
   * @type {SupabaseClient}
   *
   * @private
   * @readonly
   */
  private readonly _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    this.auth = this._supabase.auth;
  }

  /**
   * @summary - Expose the query method only.
   *
   * @param {string} relation - Table name to query.
   *
   * @public
   * @returns {PostgrestQueryBuilder<any, any, any, string, unknown>}
   */
  public from(relation: TableNames): PostgrestQueryBuilder<any, any, any, string, unknown> {
    return this._supabase.from(relation);
  }

  /**
   * @summary - Expose the insert method only.
   *
   * @param {InsertOptions['relation']} options.relation - Table name to query.
   * @param {InsertOptions['data']} options.data - Whatever data you want to insert.
   *
   * @public
   * @returns {PostgrestFilterBuilder<any, any, any, null, TableNames, unknown, 'POST', false>}
   */
  public insert(
    options: InsertOptions
  ): PostgrestFilterBuilder<any, any, any, null, TableNames, unknown, 'POST', false> {
    const { relation, data } = options;

    return this._supabase.from(relation).insert(data);
  }
}
