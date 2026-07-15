import { Injectable } from '@angular/core';

import {
  type CanDeactivate,
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  type UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthenticationService } from '@core/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateAuthenticationGuard implements CanDeactivate<unknown> {
  private readonly _authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this._authenticationService = authenticationService;
  }

  /**
   * true - Let the user leave the current page.
   * false - Prevent the user from leaving the current page.
   */
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authenticationService.isAuthenticated();
  }
}
