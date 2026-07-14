import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  /**
   * @summary - Linked to an event emitter.
   *
   * @type {boolean}
   *
   * @public
   */
  public registerSuccess: boolean = false;

  public setRegisterSuccess(data: boolean): void {
    this.registerSuccess = data;
  }
}
