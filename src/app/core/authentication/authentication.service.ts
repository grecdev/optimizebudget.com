import { Injectable } from '@angular/core';

import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type SignInWithPasswordCredentials,
  type SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

import { SupabaseService } from '@core/supabase/supabase.service';

import {
  type AuthenticationLocalStorage,
  type ResetPasswordOptions,
  LocalStorageKeys,
  AuthenticationLocalStorageKeys,
} from './authentication.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _supabase: SupabaseService;

  constructor(supabase: SupabaseService) {
    this._supabase = supabase;
  }

  /**
   * @summary - Sign up a new user.
   *
   * @param {SignUpWithPasswordCredentials} options - Some options.
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

  /**
   * @summary - Sign in an existing user.
   *
   * @param {SignInWithPasswordCredentials} options - Whatever options for sign in.
   *
   * @public
   * @returns {Promise<AuthResponse | void>}
   */
  public async signIn(
    options: SignInWithPasswordCredentials
  ): Promise<AuthTokenResponsePassword | void> {
    const RESPONSE = await this._supabase.auth.signInWithPassword(options);

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    this._setAuthenticationStorage({
      [AuthenticationLocalStorageKeys.TOKEN]: RESPONSE.data.session.access_token,
      [AuthenticationLocalStorageKeys.EXPIRES_AT]: RESPONSE.data.session.expires_at,
      [AuthenticationLocalStorageKeys.DISPLAY_NAME]:
        RESPONSE.data.user.user_metadata[AuthenticationLocalStorageKeys.DISPLAY_NAME] ?? '',
      [AuthenticationLocalStorageKeys.EMAIL]:
        RESPONSE.data.user.user_metadata[AuthenticationLocalStorageKeys.EMAIL] ?? '',
    });

    return RESPONSE;
  }

  public async resetPassword(
    params: ResetPasswordOptions
  ): Promise<ReturnType<typeof this._supabase.auth.resetPasswordForEmail> | void> {
    const RESPONSE = await this._supabase.auth.resetPasswordForEmail(params.email, params.options);

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    return RESPONSE;
  }

  /**
   * @summary - Check if  token has expired by using timestamp.
   *
   * @public
   * @returns {boolean}
   */
  public tokenExpired(): boolean {
    const AUTH_DATA = this._getAuthenticationStorage();

    if (!AUTH_DATA) {
      return true;
    }

    const CURRENT_TIME = new Date().getTime();

    return AUTH_DATA[AuthenticationLocalStorageKeys.EXPIRES_AT] >= CURRENT_TIME;
  }

  /**
   * @summary - Get authentication data from storage.
   *
   * @returns {AuthenticationLocalStorage | null}
   */
  private _getAuthenticationStorage(): AuthenticationLocalStorage | undefined {
    const KEY_BASE64 = btoa(LocalStorageKeys.AUTHENTICATION);

    const DATA_BASE64 = localStorage.getItem(KEY_BASE64);

    if (!DATA_BASE64) {
      return undefined;
    }

    const DATA_DECODED = atob(DATA_BASE64);
    const DATA_FINAL: AuthenticationLocalStorage = JSON.parse(DATA_DECODED);

    return DATA_FINAL;
  }

  /**
   * @summary - Save authentication data in browser storage.
   *
   * @param {Partial<AuthenticationLocalStorage>} authData - Authentication data.
   *
   * @private
   * @returns {void}
   */
  private _setAuthenticationStorage(authData: Partial<AuthenticationLocalStorage>): void {
    const CURRENT_AUTH_DATA = this._getAuthenticationStorage();
    const FINAL_AUTH_DATA = Object.assign(CURRENT_AUTH_DATA ?? {}, authData);

    const KEY_BASE64 = btoa(LocalStorageKeys.AUTHENTICATION);
    const DATA_BASE64 = btoa(JSON.stringify(FINAL_AUTH_DATA));

    localStorage.setItem(KEY_BASE64, DATA_BASE64);
  }
}
