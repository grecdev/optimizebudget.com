import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

import { RequirementType } from './password-requirement.model';

@Component({
  selector: 'app-password-requirement',
  templateUrl: './password-requirement.component.html',
  styleUrls: ['./password-requirement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-type]': 'isValid ? RequirementType.VALID : RequirementType.INVALID',
  },
})
export class PasswordRequirementComponent {
  protected readonly RequirementType = RequirementType;

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
    xMark: 'xmark',
    check: 'check',
  };

  /**
   * @summary - Change UI based on this state.
   *
   * @type {boolean}
   *
   * @public
   */
  @Input({ required: true }) public get isValid(): boolean {
    return this._isValid;
  }

  public set isValid(value: boolean) {
    this._isValid = value;
  }

  private _isValid: boolean = false;

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
