import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-delimiter',
  templateUrl: './form-delimiter.component.html',
  styleUrls: ['../authentication-common.scss', './form-delimiter.component.scss'],
})
export class AppFormDelimiterComponent {
  @Input({ required: true }) textContent: string = '';
}
