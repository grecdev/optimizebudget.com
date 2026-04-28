import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

@Component({
  selector: 'app-tooltip-content',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-tooltip-content',
  },
})
export class TooltipComponent implements AppOverlayContentInstances {
  /**
   * @summary - Assigned from the OverlayService.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @public
   */
  public overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Text content displayed in the template, assigned on `mouseenter` event.
   *
   * @type {string}
   *
   * @public
   */
  public textContent: string = '';
}
