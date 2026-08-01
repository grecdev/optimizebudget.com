import { ChangeDetectionStrategy, Component } from '@angular/core';
import { from, type Observable } from 'rxjs';

import { UserMetaDataKeys } from '@shared/models/enums';

import { AuthenticationService } from '@core/authentication/authentication.service';
import type { GetSessionResult } from '@core/authentication/authentication.model';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent {
  /**
   * @summary - Get session request.
   *
   * @type {Observable<GetSessionResult | null>}
   *
   * @public
   */
  public getSessionRequest$: Observable<GetSessionResult> | null = null;

  public readonly UserMetaDataKeys = UserMetaDataKeys;

  public readonly authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;

    this.getSessionRequest$ = from(this.authenticationService.getSession());
  }
}
