import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { allRoutes } from '@script/globalData';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

@Component({
  selector: 'app-success-register',
  templateUrl: './success-register.component.html',
  styleUrls: ['../../authentication-common.scss', './success-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSuccessRegisterComponent {
  /**
   * @summary - Routes to redirect from within the template.
   *
   * @type {Pick<typeof allRoutes, 'login'>}
   *
   * @public
   */
  public paths: Pick<typeof allRoutes, 'login'> = {
    login: allRoutes.login,
  };

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

  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

    this._initIconRegistry();
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
}
