import { type OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { allRoutes } from '@script/globalData';

import { UserMetaDataKeys } from '@shared/models/enums';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['../authentication-common.scss', './confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  /**
   * @summary - Routes to redirect from within the template.
   *
   * @type {Pick<typeof allRoutes, 'login'>}
   *
   * @public
   */
  public readonly allRoutes = allRoutes;

  private readonly _authenticationService: AuthenticationService;

  private readonly _router: Router;

  /**
   * @summary - Sanitize whatever inputs.
   *
   * @type {DomSanitizer}
   *
   * @private
   * @readonly
   */
  private readonly _domSanitizer: DomSanitizer;

  /**
   * @summary - Icon registry service.
   *
   * @type {IconRegistryService}
   *
   * @private
   * @readonly
   */
  private readonly _iconRegistryService: IconRegistryService;

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   * @readonly
   */
  public readonly icons: Record<string, string> = {
    circleCheck: 'circle-check',
  };

  constructor(
    authenticationService: AuthenticationService,
    router: Router,
    iconRegistryService: IconRegistryService,
    domSanitizer: DomSanitizer
  ) {
    this._authenticationService = authenticationService;
    this._router = router;

    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

    this._initIconRegistry();
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

  /**
   * @summary - Registry icons used in this component.
   *
   * @private
   * @returns {void}
   */
  private _initIconRegistry(): void {
    Object.values(this.icons).forEach(item => {
      this._iconRegistryService.addSvgIconConfig({
        name: item,
        url: this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${item}.svg`),
      });
    });
  }

  ngOnInit(): void {
    this.completeConfirmation();
  }
}
