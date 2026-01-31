import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

import { StatusType } from './pill-status.model';

@Component({
  selector: 'app-pill-status',
  templateUrl: './pill-status.component.html',
  styleUrls: ['./pill-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-pill-status',

    '[class.success]': 'type === StatusType.SUCCESS',
    '[class.warning]': 'type === StatusType.WARNING',
    '[class.error]': 'type === StatusType.ERROR',
  },
})
export class PillStatusComponent {
  protected readonly StatusType = StatusType;

  /**
   * @summary - Status type, used to change styling.
   *
   * @type {StatusType}
   *
   * @returns {StatusType}
   * @public
   */
  @Input({
    required: true,
  })
  get type(): StatusType {
    return this._type;
  }

  set type(value: StatusType) {
    this._type = value;
  }

  private _type: StatusType = StatusType.DEFAULT;

  /**
   * @summary - Basically, icons used globally.
   *
   * @type {Record<StatusType, string>}
   * @public
   */
  public icons: Record<StatusType, string> = {
    [StatusType.SUCCESS]: 'circle-check',
    [StatusType.WARNING]: 'triangle-exclamation',
    [StatusType.ERROR]: 'xmark',
    [StatusType.DEFAULT]: '',
  };

  constructor(...args: Array<unknown>);
  constructor(iconRegistryService: IconRegistryService, sanitizer: DomSanitizer) {
    Object.values(this.icons).forEach(item => {
      iconRegistryService.addSvgIconConfig({
        name: item,
        url: sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${item}.svg`),
      });
    });
  }
}
