import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-authentication-logo-container',
  templateUrl: './authentication-logo-container.component.html',
  styleUrls: ['./authentication-logo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationLogoContainerComponent {}
