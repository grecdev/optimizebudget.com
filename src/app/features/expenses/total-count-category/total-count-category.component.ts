import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';
import { CategoryType } from '@shared/models/enums';

import { type TotalExpensesCountItem } from './total-count-category.model';

@Component({
  selector: 'app-total-count-category',
  templateUrl: './total-count-category.component.html',
  styleUrls: ['./total-count-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalCountCategoryComponent {
  public totalExpenses: Array<TotalExpensesCountItem> = [
    {
      id: 0,
      type: CategoryType.FOOD,
      count: 23,
      icon: '',
    },
  ];

  /**
   * @summary - Icon registry service.
   *
   * @type {IconRegistryService}
   * @private
   */
  private readonly _iconRegistryService: IconRegistryService;

  /**
   * @summary - Sanitize whatever inputs.
   *
   * @type {DomSanitizer}
   * @private
   */
  private readonly _domSanitizer: DomSanitizer;

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    'iconName': 'icon-name',
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
        url: this._domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${item}.svg`
        ),
      });
    });
  }
}
