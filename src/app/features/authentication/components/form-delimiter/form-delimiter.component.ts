import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-delimiter',
  templateUrl: './form-delimiter.component.html',
  styleUrls: ['../../authentication-common.scss', './form-delimiter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFormDelimiterComponent {
  @Input({ required: true }) textContent: string = '';
}
