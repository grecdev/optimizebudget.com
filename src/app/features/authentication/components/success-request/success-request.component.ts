import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { allRoutes } from '@script/globalData';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

@Component({
  selector: 'app-success-request',
  templateUrl: './success-request.component.html',
  styleUrls: ['../../authentication-common.scss', './success-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSuccessRequestComponent {
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

  /**
   * @summary - Just info heading.
   *
   * @type {string}
   *
   * @public
   */
  @Input({ required: true }) public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  private _title: string = '';

  /**
   * @summary - Redirect route.
   *
   * @type {string}
   *
   * @public
   */
  @Input({ required: true }) public get route(): string {
    return this._route;
  }

  public set route(value: string) {
    this._route = value;
  }

  private _route: string = '';

  /**
   * @summary - Text content for route.
   *
   * @type {string}
   *
   * @public
   */
  @Input({ required: true }) public get routeTextContent(): string {
    return this._routeTextContent;
  }

  public set routeTextContent(value: string) {
    this._routeTextContent = value;
  }

  private _routeTextContent: string = '';

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
