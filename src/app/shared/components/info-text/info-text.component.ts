import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { InfoType } from './info-text.model';

@Component({
  selector: 'p[appInfoText]',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'info-text',
    '[class.info-type-success]': 'type === "success"',
    '[class.info-type-error]': 'type === "error"',
  },
})
export class AppInfoTextComponent {
  @Input({ required: true }) type!: InfoType;
}
