import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { InfoType } from './info-text.model';

@Component({
  selector: 'p[appInfoText]',
  templateUrl: './info-text.component.html',
  styleUrls: ['./info-text.component.scss'],
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'info-text',
    '[class.info-type-success]': '_type === "success"',
    '[class.info-type-error]': '_type === "error"',
  },
})
export class InfoTextComponent {
  @Input({ required: true }) _type!: InfoType;
}
