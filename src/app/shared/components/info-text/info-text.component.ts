import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { InfoType } from './info-text.model';

@Component({
  selector: 'p[appInfoText]',
  templateUrl: './info-text.component.html',
  styleUrl: './info-text.component.scss',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'info-text',
    '[class]': 'classNameHost()',
  },
})
export class InfoTextComponent {
  type = input.required<InfoType>();

  classNameHost = computed<string>(() => {
    const classNameArray = [`infoType-${this.type()}`];

    return classNameArray.join(' ');
  });
}
