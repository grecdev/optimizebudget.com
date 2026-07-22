import { Injectable } from '@angular/core';

import {
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  type CanActivate,
  type UrlTree,
  Router,
} from '@angular/router';

import { type Observable } from 'rxjs';

import { allRoutes } from '@script/globalData';

import { AuthenticationService } from '@core/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateAuthenticationGuard implements CanActivate {
  private readonly _authenticationService: AuthenticationService;
  private readonly _router: Router;

  constructor(authenticationService: AuthenticationService, router: Router) {
    this._authenticationService = authenticationService;
    this._router = router;
  }

  /**
   * true - Let the user access the target page.
   * false - Prevent the user from accessing the target page.
   */
  public canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const TOKEN_HAS_EXPIRED = this._authenticationService.tokenExpired();

    if (!TOKEN_HAS_EXPIRED) {
      return true;
    }

    return this._router.createUrlTree([allRoutes.login.path], {
      queryParams: {
        returnUrl: state.url.length > 1 ? state.url.replace('/', '') : state.url,
      },
    });
  }
}
