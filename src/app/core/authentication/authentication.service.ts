import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type SignInWithPasswordCredentials,
  type SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

import { SupabaseService } from '@core/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _supabase: SupabaseService;

  /**
   * @summary - Stream to check authentication state.
   *
   * And expose the stream only to subscribe to it if need it.
   *
   * @type {BehaviorSubject<boolean>}
   *
   * @private
   * @readonly
   */
  private readonly _isAuthenticatedSubscriber: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly isAuthenticatedObserver$ = this._isAuthenticatedSubscriber.asObservable();

  constructor(supabase: SupabaseService) {
    this._supabase = supabase;
  }

  /**
   * @summary - Get current stream state.
   *
   * @public
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    return this._isAuthenticatedSubscriber.getValue();
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

    this._isAuthenticatedSubscriber.next(true);

    return RESPONSE;
  }
}
