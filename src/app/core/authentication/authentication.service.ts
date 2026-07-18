import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, filter } from 'rxjs';

import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type SignInWithPasswordCredentials,
  type SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

import { RouteUtil } from '@shared/utility/route';
import { allRoutes } from '@script/globalData';

import { SupabaseService } from '@core/supabase/supabase.service';

import {
  type ResetPasswordOptions,
  AuthenticationQueryParams,
  AuthenticationBrowserStorageKeys,
  AuthenticationLocalStorage,
} from './authentication.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _token: string = '';

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

  private readonly _router: Router;
  private readonly _routeUtil = new RouteUtil();
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _location: Location;

  constructor(
    supabase: SupabaseService,
    router: Router,
    activatedRoute: ActivatedRoute,
    location: Location
  ) {
    this._supabase = supabase;
    this._router = router;
    this._activatedRoute = activatedRoute;
    this._location = location;

    this._initRouterEvents();
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
   * @summary - Reset query params on whatever cases.
   *
   * I do not want to actually trigger a second route change.
   *
   * @private
   * @returns {void}
   */
  private _resetQueryParams(): void {
    const URL_TREE = this._router.createUrlTree([], {
      relativeTo: this._activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: {
        [AuthenticationQueryParams.TOKEN]: null,
      },
    });

    this._location.replaceState(this._router.serializeUrl(URL_TREE));
  }

  /**
   * @summary - Check if current session is valid.
   *
   * Only executed when the user access the internal app.
   *
   * @private
   * @returns {void}
   */
  private _checkValidToken(): void {
    const AUTHENTICATION_DATA_STORAGE = this._getAuthenticationStorage();

    const HAS_TOKEN_STORAGE =
      AUTHENTICATION_DATA_STORAGE &&
      Object.hasOwn(AUTHENTICATION_DATA_STORAGE, AuthenticationQueryParams.TOKEN);

    if (!HAS_TOKEN_STORAGE) {
      this._isAuthenticatedSubscriber.next(false);

      this._router.navigate([allRoutes.login.path], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });

      return;
    }

    console.log('_checkValidToken');
  }

  /**
   * @summary - Track route change events.
   *
   * @private
   * @returns {void}
   */
  private _initRouterEvents(): void {
    this._router.events.pipe(filter(data => data instanceof NavigationEnd)).subscribe({
      next: () => {
        const ACTIVATED_ROUTE_DATA = this._routeUtil.getDeepestRouteData(
          this._activatedRoute.firstChild
        );

        const IS_AUTHENTICATION_PAGE =
          ACTIVATED_ROUTE_DATA && ACTIVATED_ROUTE_DATA.authenticationPage;

        if (IS_AUTHENTICATION_PAGE) {
          return;
        }

        const TOKEN_QUERY_PARAMS =
          this._activatedRoute.snapshot.queryParams[AuthenticationQueryParams.TOKEN];

        if (TOKEN_QUERY_PARAMS) {
          this._token = TOKEN_QUERY_PARAMS;

          this._setAuthenticationStorage();
          this._resetQueryParams();
        }

        this._checkValidToken();
      },
    });
  }

  /**
   * @summary - Get authentication data from storage.
   *
   * @returns {AuthenticationLocalStorage | null}
   */
  private _getAuthenticationStorage(): AuthenticationLocalStorage | undefined {
    const KEY_BASE64 = btoa(AuthenticationBrowserStorageKeys.AUTHENTICATION);

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
   * @private
   * @returns {void}
   */
  private _setAuthenticationStorage(): void {
    if (!this._token) {
      console.log('Token not found in _setTokenStorage');
      return;
    }

    const DATA: AuthenticationLocalStorage = {
      [AuthenticationQueryParams.TOKEN]: this._token,
    };

    const KEY_BASE64 = btoa(AuthenticationBrowserStorageKeys.AUTHENTICATION);
    const DATA_BASE64 = btoa(JSON.stringify(DATA));

    localStorage.setItem(KEY_BASE64, DATA_BASE64);
  }
}
