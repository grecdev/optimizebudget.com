import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

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
    '[class]': 'classNameHost',
  },
})
export class InfoTextComponent {
  @Input({ required: true }) type!: InfoType;

  get classNameHost() {
    const classNameArray = [`infoType-${this.type}`];

    return classNameArray.join(' ');
  }
}
