import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesNotesComponent } from './expenses-notes.component';

@NgModule({
  declarations: [ExpensesNotesComponent],
  imports: [CommonModule],
  exports: [ExpensesNotesComponent],
})
export class ExpensesNotesModule {}
