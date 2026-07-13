import { Injectable } from '@angular/core';

import { AuthResponse, type SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { SupabaseService } from '@core/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _supabase: SupabaseService;

  /**
   * @summary - User authenticated state.
   *
   * @type {boolean}
   *
   * @public
   */
  public isAuthenticated: boolean = true;

  constructor(supabase: SupabaseService) {
    this._supabase = supabase;
  }

  /**
   * @summary - Sign up the user.
   *
   * @public
   * @returns {Promise<AuthResponse | void>}
   */
  public async signUp(options: SignUpWithPasswordCredentials): Promise<AuthResponse | void> {
    const RESPONSE = await this._supabase.auth.signUp(options);

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    return RESPONSE;
  }
}
