import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { SupabaseService } from '@core/supabase/supabase.service';

import { ExpenseStatus } from '@shared/models/enums';
import { StatusType } from '@shared/components/pill-status/pill-status.model';

import { type ExpenseItem, ExpenseItemKey } from './tracker-table.model';
import { MediaQueryService } from '@shared/services/media-query/media-query.service';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

@Component({
  selector: 'app-tracker-table',
  templateUrl: './tracker-table.component.html',
  styleUrls: ['./tracker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackerTableComponent {
  public readonly ExpenseItemKey = ExpenseItemKey;
  public readonly StatusType = StatusType;
  public readonly ExpenseStatus = ExpenseStatus;

  public readonly displayedColumns: Array<ExpenseItemKey> = [
    ExpenseItemKey.DATE_CREATED,
    ExpenseItemKey.STATUS,
    ExpenseItemKey.NAME,
    ExpenseItemKey.TOTAL,
  ];

  public dataSource: Array<ExpenseItem> = [];

  /**
   * @summary - Render mobile components based on this state.
   *
   * @type {boolean}
   *
   * @public
   */
  public isMobile: boolean = false;

  public loading: boolean = true;

  private readonly _mediaQueryService: MediaQueryService;
  private readonly _supabaseService: SupabaseService;

  private readonly _changeDetectorRef: ChangeDetectorRef;

  constructor(
    mediaQueryService: MediaQueryService,
    changeDetectorRef: ChangeDetectorRef,
    supabaseService: SupabaseService
  ) {
    this._mediaQueryService = mediaQueryService;
    this._supabaseService = supabaseService;

    this._changeDetectorRef = changeDetectorRef;
  }

  /**
   * @summary - Init the media query subscription.
   *
   * @returns {void}
   * @private
   */
  private _initMediaQuerySubscription(): void {
    this._mediaQueryService.mediaQuery('max', 'lg').subscribe({
      next: value => {
        this.isMobile = value;
        this._changeDetectorRef.markForCheck();
      },
    });
  }

  /**
   * @summary - Optimize loop fn.
   *
   * @param {number} _ - Not used.
   * @param {ExpenseItem} item - Iteration item.
   *
   * @public
   * @returns {number}
   */
  public trackByFnDataSource(_: number, item: ExpenseItem): number {
    return item[ExpenseItemKey.ID];
  }

  /**
   * @summary - Get all expenses.
   *
   * @private
   * @returns {Promise<void>}
   */
  private async _initGetAllExpenses(): Promise<void> {
    const CURRENT_PAGE = 0;
    const PAGE_SIZE = 10;

    const FROM = CURRENT_PAGE * PAGE_SIZE;
    const TO = FROM + PAGE_SIZE - 1;

    try {
      const { data, error } = (await this._supabaseService
        .from('expenses')
        .select()
        .range(FROM, TO)) as PostgrestSingleResponse<Array<ExpenseItem>>;

      if (!data) {
        return;
      }

      this.dataSource = data;
      this.loading = false;
      this._changeDetectorRef.markForCheck();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  ngOnInit(): void {
    this._initMediaQuerySubscription();

    this._initGetAllExpenses();
  }
}
