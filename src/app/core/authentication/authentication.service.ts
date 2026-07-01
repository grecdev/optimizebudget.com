import { Injectable } from '@angular/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getTodos() {
    return this._supabase.from('test').select('*');
  }
}
