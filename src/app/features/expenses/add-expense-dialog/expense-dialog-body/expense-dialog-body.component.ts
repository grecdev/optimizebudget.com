import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SupabaseService } from '@core/supabase/supabase.service';

import { CategoryType, TableNames } from '@shared/models/enums';

import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { SnackbarPosition, SnackbarType } from '@shared/components/snackbar/snackbar.model';
import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { ExpenseItemKey } from '../../tracker-table/tracker-table.model';

import {
  type ExpenseCategoriesFormatted,
  type ExpenseCategoryItem,
} from './expense-dialog-body.model';

@Component({
  selector: 'expense-dialog-body',
  templateUrl: './expense-dialog-body.component.html',
  styleUrls: ['./expense-dialog-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDialogBodyComponent implements AppOverlayContentInstances {
  public ExpenseItemKey = ExpenseItemKey;

  /**
   * @summary - Loading state for async requests.
   *
   * @type {boolean}
   *
   * @public
   */
  public loading: boolean = false;

  /**
   * @summary - Assigned from the OverlayService.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @public
   */
  public overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Category to set
   *
   * @type {ExpenseCategoriesFormatted}
   *
   * @public
   */
  public expenseCategories: ExpenseCategoriesFormatted = [];

  public addExpenseForm = new FormGroup({
    [ExpenseItemKey.NAME]: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^([\w\d ])+$/g),
      ],
    }),
    [ExpenseItemKey.VENDOR_NAME]: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^([\w\d ])+$/g),
      ],
    }),
    [ExpenseItemKey.CATEGORY]: new FormControl('', {
      validators: [Validators.required],
    }),
    [ExpenseItemKey.TOTAL]: new FormControl(0, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  private readonly _changeDetectorRef: ChangeDetectorRef;

  private readonly _snackbarService: SnackbarService;
  private readonly _supabaseService: SupabaseService;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    snackbarService: SnackbarService,
    supabaseService: SupabaseService
  ) {
    this._changeDetectorRef = changeDetectorRef;

    this._snackbarService = snackbarService;
    this._supabaseService = supabaseService;

    this._formatCategoriesObject();
  }

  /**
   * @summary - Create an array with key-value pair objects.
   *
   * @private
   * @returns {void}
   */
  private _formatCategoriesObject(): void {
    this.expenseCategories = Object.values(CategoryType).map(item => ({
      textContent: item,
      value: item,
    }));
  }

  /**
   * @summary - Close expense dialog on custom button click.
   *
   * @param {MouseEvent} event - DOM Event
   *
   * @public
   * @returns {void}
   */
  public closeExpenseDialog(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.close();
  }

  /**
   * @summary - Track by function used for expense categories for loop.
   *
   * @param {number} _index - Not used.
   * @param {ExpenseCategoryItem} item - Array's item.
   *
   * @returns {string}
   * @public
   */
  public expenseCategoriesTrackByFn(_index: number, item: ExpenseCategoryItem): string {
    return item.value;
  }

  /**
   * @summary - Submit request functionality.
   *
   * @public
   * @returns {void}
   */
  public async handleSubmit(): Promise<void> {
    if (!this.addExpenseForm.valid) {
      this.overlayReference = this._snackbarService.open({
        type: SnackbarType.ERROR,
        message: 'Invalid form!',
        position: {
          horizontal: SnackbarPosition.MIDDLE,
          vertical: SnackbarPosition.END,
        },
      });

      this._initCloseSubscription();

      return;
    }

    this.loading = true;

    const VALUES = this.addExpenseForm.value;

    try {
      const { status, error } = await this._supabaseService.insert({
        relation: TableNames.EXPENSES,
        data: VALUES,
      });

      if (error) {
        throw Error(`Error ${status}: ${error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        this.overlayReference = this._snackbarService.open({
          type: SnackbarType.ERROR,
          message: error.message,
          position: {
            horizontal: SnackbarPosition.MIDDLE,
            vertical: SnackbarPosition.END,
          },
        });

        this._initCloseSubscription();
      }
    } finally {
      this.loading = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * @summary - Proper unsubscribe.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(): void {
    if (!this.overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this.overlayReference.closingOverlay$.subscribe({
      next: () => {
        this._changeDetectorRef.markForCheck();
        this.overlayReference = null;
      },
    });
  }
}
