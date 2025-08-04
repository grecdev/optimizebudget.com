import { Component } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  fullName: string = 'Grecu Alexandru';
  email: string = 'mail@example.com';
}
