import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-expenses-notes',
  templateUrl: './expenses-notes.component.html',
  styleUrls: ['./expenses-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesNotesComponent {
  value: FormControl<string | null> = new FormControl('');
}
