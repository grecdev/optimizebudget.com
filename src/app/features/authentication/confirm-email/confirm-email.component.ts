import { type OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserMetaDataKeys } from '@shared/models/enums';

import { allRoutes } from '@script/globalData';

import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['../authentication-common.scss', './confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  private readonly _authenticationService: AuthenticationService;

  private readonly _router: Router;

  constructor(authenticationService: AuthenticationService, router: Router) {
    this._authenticationService = authenticationService;
    this._router = router;
  }

  async completeConfirmation(): Promise<void> {
    try {
      const RESPONSE = await this._authenticationService.getSession();

      const USER_DATA = RESPONSE.data.session ? RESPONSE.data.session.user : null;

      if (!USER_DATA) {
        return;
      }

      const CONFIRMATION_DONE =
        Object.hasOwn(USER_DATA.user_metadata, UserMetaDataKeys.CONFIRMATION_DONE) &&
        USER_DATA.user_metadata[UserMetaDataKeys.CONFIRMATION_DONE];

      if (CONFIRMATION_DONE) {
        this._router.navigate([allRoutes.overview.path]);
        return;
      }

      await this._authenticationService.completeConfirmation();
    } catch (error) {
      if (error instanceof Error) {
      }
    }
  }

  ngOnInit(): void {
    this.completeConfirmation();
  }
}
