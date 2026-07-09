import { Injectable } from '@angular/core';

import { type SupabaseClient, createClient } from '@supabase/supabase-js';

import { environment } from '@environments/environment';

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
}
