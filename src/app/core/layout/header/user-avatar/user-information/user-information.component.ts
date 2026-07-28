import { ChangeDetectionStrategy, Component } from '@angular/core';
import { from, type Observable } from 'rxjs';

import { type UserResponse } from '@supabase/supabase-js';

import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent {
  /**
   * @summary - Get user request.
   *
   * @type {Observable<UserResponse | null>}
   *
   * @public
   */
  public getUserRequest$: Observable<UserResponse | null> | null = null;

  public readonly authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;

    this.getUserRequest$ = from(this.authenticationService.getUser());
  }
}
