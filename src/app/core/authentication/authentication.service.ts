import { Injectable } from '@angular/core';

import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type SignInWithPasswordCredentials,
  type SignUpWithPasswordCredentials,
  type UserResponse,
  type UserAttributes,
  type SignOut,
  type AuthError,
} from '@supabase/supabase-js';

import { environment } from '@environments/environment';
import { allRoutes } from '@script/globalData';

import { UserMetaDataKeys } from '@shared/models/enums';

import { SupabaseService } from '@core/supabase/supabase.service';

import { type SendResetPasswordLinkOptions, type GetSessionResult } from './authentication.model';

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

    const EMAIL_EXIST =
      RESPONSE &&
      RESPONSE.data &&
      RESPONSE.data.user &&
      RESPONSE.data.user.identities &&
      RESPONSE.data.user.identities.length === 0;

    if (EMAIL_EXIST) {
      throw Error('Email already registered!');
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
   * @summary - Get current user session via network request.
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
   * @summary - Get current session via localStorage.
   *
   * @private
   * @returns {Promise<GetSessionResult>}
   */
  public async getSession(): Promise<GetSessionResult> {
    const RESPONSE = await this._supabase.auth.getSession();

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    return RESPONSE;
  }

  /**
   * @summary - Signs out the user.
   *
   * @param {SignOut} options - Signout options.
   *
   * @public
   * @returns {Promise<{ error: AuthError | null }>}
   */
  public async signOut(options?: SignOut): Promise<{ error: AuthError | null }> {
    const RESPONSE = await this._supabase.auth.signOut();

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
  public async tokenExpired(): Promise<boolean> {
    const RESPONSE = await this.getSession();

    if (RESPONSE.error || !RESPONSE.data.session) {
      return true;
    }

    const SESSION_DATA = RESPONSE.data.session;

    const EXPIRES_AT = SESSION_DATA.expires_at ? SESSION_DATA.expires_at * 1000 : 0;
    const CURRENT_TIME = new Date().getTime();

    return CURRENT_TIME > EXPIRES_AT;
  }

  /**
   * @summary - Completes the account confirmation procedure.
   *
   * And I want the `confirm-email` page to be accessed one-time only.
   *
   * @public
   * @returns {Promise<UserResponse | void>}
   */
  public async completeConfirmation(): Promise<UserResponse | void> {
    const RESPONSE = await this._supabase.auth.updateUser({
      data: {
        [UserMetaDataKeys.CONFIRMATION_DONE]: true,
      },
    });

    if (RESPONSE.error) {
      throw Error(`${RESPONSE.error.name} ${RESPONSE.error.status}: ${RESPONSE.error.message}`);
    }

    return RESPONSE;
  }
}
