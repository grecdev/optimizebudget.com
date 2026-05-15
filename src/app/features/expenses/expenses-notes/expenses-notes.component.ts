import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-expenses-notes',
  templateUrl: './expenses-notes.component.html',
  styleUrls: ['./expenses-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesNotesComponent {}
