import { Injectable } from '@angular/core';

import {
  type ActivatedRouteSnapshot,
  type CanActivateChild,
  type RouterStateSnapshot,
  type UrlTree,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from '@core/authentication/authentication.service';
import { allRoutes } from '@script/globalData';

@Injectable({
  providedIn: 'root',
})
export class CanActivateAuthenticationGuard implements CanActivateChild {
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
  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authenticationService.isAuthenticated()) {
      return true;
    }

    return this._router.createUrlTree([allRoutes.login.path], {
      queryParams: {
        returnUrl: state.url.length > 1 ? state.url.replace('/', '') : state.url,
      },
    });
  }
}
