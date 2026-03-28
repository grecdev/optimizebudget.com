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
  // Will be fetched from Supabase.
  public totalExpensesData: Array<TotalExpensesCountItem> = [
    {
      id: 0,
      type: CategoryType.FOOD,
      count: 12,
    },
    {
      id: 1,
      type: CategoryType.GADGETS,
      count: 34,
    },
    {
      id: 2,
      type: CategoryType.CLOTHING,
      count: 56,
    },
    {
      id: 3,
      type: CategoryType.HOME,
      count: 78,
    },
  ];

  /**
   * @summary - Count of all expenses.
   *
   * @type number
   *
   * @public
   */
  public totalExpensesCount: number = 0;

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
    [CategoryType.FOOD]: 'utensils',
    [CategoryType.GADGETS]: 'mobile-screen-button',
    [CategoryType.CLOTHING]: 'shirt',
    [CategoryType.HOME]: 'house',
  };

  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

    this.calculateTotalExpenses();

    this._initIconRegistry();
  }

  /**
   * @summary - Track by function used for totalExpenses data.
   *
   * @param {number} _index - Not used.
   * @param {TotalExpensesCountItem} item - Current iterable item.
   *
   * @public
   * @returs {number}
   */
  public trackByFnTotalExpenses(_index: number, item: TotalExpensesCountItem): number {
    return item.id;
  }

  /**
   * @summary - A count of all expenses from data.
   *
   * @public
   * @returns {void}
   */
  public calculateTotalExpenses(): void {
    this.totalExpensesCount = this.totalExpensesData
      .map(item => item.count)
      .reduce((total, currentIteration) => total + currentIteration, 0);
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
