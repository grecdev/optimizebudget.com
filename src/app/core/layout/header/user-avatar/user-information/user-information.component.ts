import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInformationComponent {
  fullName: string = 'Grecu Aladsaexandru';
  email: string = 'mail@example.com';

  userData: null = null;
  error: boolean = true;
}
