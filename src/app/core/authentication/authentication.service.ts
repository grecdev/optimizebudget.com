import { Injectable } from '@angular/core';

import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type SignInWithPasswordCredentials,
  type SignUpWithPasswordCredentials,
  type UserResponse,
  type UserAttributes,
  type Session,
} from '@supabase/supabase-js';

import { environment } from '@environments/environment';
import { allRoutes } from '@script/globalData';

import { SupabaseService } from '@core/supabase/supabase.service';

import { type SendResetPasswordLinkOptions } from './authentication.model';

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

    return RESPONSE;
  }

  /**
   * @summary - Send a reset password link.
   *
   * @param {ResetPasswordOptions} params - Options for request.
   *
   * @public
   * @returns {Promise<ReturnType<typeof this._supabase.auth.resetPasswordForEmail> | void>}
   */
  public async sendResetPasswordLink(
    params: SendResetPasswordLinkOptions
  ): Promise<ReturnType<typeof this._supabase.auth.resetPasswordForEmail> | void> {
    const RESPONSE = await this._supabase.auth.resetPasswordForEmail(params.email, params.options);

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    return RESPONSE;
  }

  /**
   * @summary - Reset password request.
   *
   * @param {UserAttributes} options - User attributes options.
   *
   * @public
   * @returns {Promise<UserResponse | void>}
   */
  public async resetPassword(options: UserAttributes): Promise<UserResponse | void> {
    const RESPONSE = await this._supabase.auth.updateUser(options, {
      emailRedirectTo: `${environment.emailRedirectTo}/${allRoutes.login.path}`,
    });

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    return RESPONSE;
  }

  /**
   * @summary - Get current user session.
   *
   * @private
   * @returns {Promise<UserResponse>}
   */
  public async getUser(): Promise<UserResponse> {
    const RESPONSE = await this._supabase.auth.getUser();

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

    const EXPIRES_AT = AUTH_DATA.expires_at ? AUTH_DATA.expires_at * 1000 : 0;
    const CURRENT_TIME = new Date().getTime();

    return CURRENT_TIME < EXPIRES_AT;
  }

  /**
   * @summary - Get supabase's authentication data from storage.
   *
   * @returns {Session | null}
   */
  private _getAuthenticationStorage(): Session | null {
    const SUPABASE_STORAGE_KEY = Object.hasOwn(this._supabase.auth, 'storageKey')
      ? this._supabase.auth['storageKey']
      : '';

    const SUPABASE_STORAGE_DATA = localStorage.getItem(SUPABASE_STORAGE_KEY);
    const SUPABASE_STORAGE_DATA_FORMATTED = SUPABASE_STORAGE_DATA
      ? JSON.parse(SUPABASE_STORAGE_DATA)
      : null;

    return SUPABASE_STORAGE_DATA_FORMATTED;
  }
}
