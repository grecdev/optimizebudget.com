import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-monthly-budget',
  templateUrl: './monthly-budget.component.html',
  styleUrls: ['./monthly-budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyBudgetComponent {
  monthlyBudget = 12345.67;
}
