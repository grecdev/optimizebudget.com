import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-total-monthly-spent',
  templateUrl: './total-monthly-spent.component.html',
  styleUrls: ['./total-monthly-spent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalMonthlySpentComponent {
  // Will be fetched from Supabase.
  public totalMoneySpent: number = 320.43;
}
