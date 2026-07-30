import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';

@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [CommonModule, ConfirmEmailRoutingModule],
})
export class ConfirmEmailModule {}
