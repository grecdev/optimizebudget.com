import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ExpensesNotesComponent } from './expenses-notes.component';

@NgModule({
  declarations: [ExpensesNotesComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ExpensesNotesComponent],
})
export class ExpensesNotesModule {}
