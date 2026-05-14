import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

import {
  type IncomingPaymentsDataSource,
  type IncomingPaymentsItem,
  IncomingPaymentsItemKey,
} from './incoming-payments.model';

@Component({
  selector: 'app-incoming-payment-subscriptions',
  templateUrl: './incoming-payments.component.html',
  styleUrls: ['./incoming-payments.component.scss'],
})
export class IncomingPaymentsComponent {
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
   * @summary - Keys used for datasource.
   *
   * @type {IncomingPaymentsItemKey}
   *
   * @public
   * @readonly
   */
  public readonly dataSourceKeys: typeof IncomingPaymentsItemKey =
    IncomingPaymentsItemKey;

  /**
   * @summary - Datasource used in UI.
   *
   * @type {IncomingPaymentsDataSource}
   *
   * @public
   * @readonly
   */
  public readonly dataSource: IncomingPaymentsDataSource = [
    {
      [IncomingPaymentsItemKey.ID]: 1,
      [IncomingPaymentsItemKey.NAME]: 'Office Supplies',
      [IncomingPaymentsItemKey.AMOUNT]: 120.5,
      [IncomingPaymentsItemKey.TIMESTAMP]: 1710000000000,
    },
    {
      [IncomingPaymentsItemKey.ID]: 2,
      [IncomingPaymentsItemKey.NAME]: 'Client Payment - Invoice #1023',
      [IncomingPaymentsItemKey.AMOUNT]: 75.0,
      [IncomingPaymentsItemKey.TIMESTAMP]: 1710003600000,
    },
    {
      [IncomingPaymentsItemKey.ID]: 3,
      [IncomingPaymentsItemKey.NAME]: 'Subscription Revenue',
      [IncomingPaymentsItemKey.AMOUNT]: 200.99,
      [IncomingPaymentsItemKey.TIMESTAMP]: 1710007200000,
    },
    {
      [IncomingPaymentsItemKey.ID]: 4,
      [IncomingPaymentsItemKey.NAME]: 'Consulting Fee',
      [IncomingPaymentsItemKey.AMOUNT]: 50.25,
      [IncomingPaymentsItemKey.TIMESTAMP]: 1710010800000,
    },
    {
      [IncomingPaymentsItemKey.ID]: 5,
      [IncomingPaymentsItemKey.NAME]: 'Product Sale',
      [IncomingPaymentsItemKey.AMOUNT]: 300.0,
      [IncomingPaymentsItemKey.TIMESTAMP]: 1710014400000,
    },
    {
      [IncomingPaymentsItemKey.ID]: 6,
      [IncomingPaymentsItemKey.NAME]: 'Maintenance Service',
      [IncomingPaymentsItemKey.AMOUNT]: 89.75,
      [IncomingPaymentsItemKey.TIMESTAMP]: 1710018000000,
    },
    // {
    //   [IncomingPaymentsItemKey.ID]: 7,
    //   [IncomingPaymentsItemKey.NAME]: 'Advertising Revenue',
    //   [IncomingPaymentsItemKey.AMOUNT]: 45.6,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710021600000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 8,
    //   [IncomingPaymentsItemKey.NAME]: 'Affiliate Earnings',
    //   [IncomingPaymentsItemKey.AMOUNT]: 150.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710025200000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 9,
    //   [IncomingPaymentsItemKey.NAME]: 'Refund Adjustment',
    //   [IncomingPaymentsItemKey.AMOUNT]: 60.4,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710028800000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 10,
    //   [IncomingPaymentsItemKey.NAME]: 'License Fee',
    //   [IncomingPaymentsItemKey.AMOUNT]: 500.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710032400000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 11,
    //   [IncomingPaymentsItemKey.NAME]: 'Hardware Purchase',
    //   [IncomingPaymentsItemKey.AMOUNT]: 430.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710036000000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 12,
    //   [IncomingPaymentsItemKey.NAME]: 'Client Payment - Invoice #1047',
    //   [IncomingPaymentsItemKey.AMOUNT]: 980.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710039600000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 13,
    //   [IncomingPaymentsItemKey.NAME]: 'Support Contract',
    //   [IncomingPaymentsItemKey.AMOUNT]: 175.5,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710043200000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 14,
    //   [IncomingPaymentsItemKey.NAME]: 'Training Session',
    //   [IncomingPaymentsItemKey.AMOUNT]: 250.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710046800000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 15,
    //   [IncomingPaymentsItemKey.NAME]: 'Cloud Hosting Revenue',
    //   [IncomingPaymentsItemKey.AMOUNT]: 99.99,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710050400000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 16,
    //   [IncomingPaymentsItemKey.NAME]: 'Partnership Commission',
    //   [IncomingPaymentsItemKey.AMOUNT]: 340.75,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710054000000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 17,
    //   [IncomingPaymentsItemKey.NAME]: 'Event Sponsorship',
    //   [IncomingPaymentsItemKey.AMOUNT]: 1200.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710057600000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 18,
    //   [IncomingPaymentsItemKey.NAME]: 'Software Resale',
    //   [IncomingPaymentsItemKey.AMOUNT]: 65.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710061200000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 19,
    //   [IncomingPaymentsItemKey.NAME]: 'Data Analytics Report',
    //   [IncomingPaymentsItemKey.AMOUNT]: 780.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710064800000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 20,
    //   [IncomingPaymentsItemKey.NAME]: 'Freight & Logistics',
    //   [IncomingPaymentsItemKey.AMOUNT]: 112.3,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710068400000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 21,
    //   [IncomingPaymentsItemKey.NAME]: 'Client Payment - Invoice #1089',
    //   [IncomingPaymentsItemKey.AMOUNT]: 540.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710072000000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 22,
    //   [IncomingPaymentsItemKey.NAME]: 'API Access Fee',
    //   [IncomingPaymentsItemKey.AMOUNT]: 29.99,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710075600000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 23,
    //   [IncomingPaymentsItemKey.NAME]: 'Warranty Extension',
    //   [IncomingPaymentsItemKey.AMOUNT]: 85.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710079200000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 24,
    //   [IncomingPaymentsItemKey.NAME]: 'Recruitment Service',
    //   [IncomingPaymentsItemKey.AMOUNT]: 620.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710082800000,
    // },
    // {
    //   [IncomingPaymentsItemKey.ID]: 25,
    //   [IncomingPaymentsItemKey.NAME]: 'Annual Retainer',
    //   [IncomingPaymentsItemKey.AMOUNT]: 3500.0,
    //   [IncomingPaymentsItemKey.TIMESTAMP]: 1710086400000,
    // },
  ];

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    arrowRight: 'arrow-right',
  };

  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

    this._initIconRegistry();
  }

  /**
   * @summary - Track by function used for dataSource.
   *
   * @public
   * @returns {number}
   */
  public trackByDataSource(_: number, item: IncomingPaymentsItem): number {
    return item[IncomingPaymentsItemKey.ID];
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
