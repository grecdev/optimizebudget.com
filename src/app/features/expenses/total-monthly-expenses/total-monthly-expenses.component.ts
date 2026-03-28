import { Component } from '@angular/core';

@Component({
  selector: 'app-total-monthly-expenses',
  templateUrl: './total-monthly-expenses.component.html',
  styleUrls: ['./total-monthly-expenses.component.scss'],
})
export class TotalMonthlyExpensesComponent {
  // Will be fetched from Supabase.
  public totalMoneySpent: number = 320.43;
  public totalExpenses: number = 10;
}
