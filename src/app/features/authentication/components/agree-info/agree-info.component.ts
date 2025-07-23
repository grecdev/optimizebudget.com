import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agree-info-component',
  templateUrl: './agree-info.component.html',
  styleUrls: ['../../authentication-common.scss', './agree-info.component.scss'],
})
export class AgreeInfoComponent {
  @Input({ required: true }) textContent: string = '';
}
