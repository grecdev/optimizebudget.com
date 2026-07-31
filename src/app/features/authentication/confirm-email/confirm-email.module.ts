import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { AppIconModule } from '@shared/components/icon/icon.module';
import { SuccessRequestModule } from '@features/authentication/components/success-request/success-request.module';

@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [CommonModule, ConfirmEmailRoutingModule, AppIconModule, SuccessRequestModule],
})
export class ConfirmEmailModule {}
