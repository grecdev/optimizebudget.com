import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSignOutButtonComponent {}
