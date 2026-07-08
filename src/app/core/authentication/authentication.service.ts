import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /**
   * @summary - User authenticated state.
   *
   * @type {boolean}
   *
   * @public
   */
  public isAuthenticated: boolean = false;

  constructor() {
    console.log('AuthenticationService');
  }
}
