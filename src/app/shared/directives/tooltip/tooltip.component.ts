import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';

import { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

@Component({
  selector: 'app-tooltip-content',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-tooltip-content',
    '(mouseleave)': '_handleMouseLeave($event)',
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
   * @summary - HTML element assigned from the @Directive.
   *
   * @type {HTMLElement | null}
   *
   * @public
   */
  public triggerElement: HTMLElement | null = null;

  /**
   * @summary - To check if the tooltip is visible in the viewport.
   *
   * @type {boolean}
   *
   * @public
   */
  public isVisible: boolean = false;

  /**
   * @summary - Text content displayed in the template, assigned on `mouseenter` event.
   *
   * @type {string}
   *
   * @public
   */
  public textContent: string = '';

  /**
   * @summary - Track hidden event interactions.
   *
   * @type {Subject<void>}
   *
   * @public
   */
  public onHidden$: Subject<void> = new Subject<void>();

  /**
   * @summary - Show tooltip on `mouseenter` trigger.
   *
   * @public
   * @returns {void}
   */
  public showTooltip(): void {
    this.isVisible = true;
  }

  /**
   * @summary - Handles `mouseleave` event.
   *
   * @param {MouseEvent} event - Event object.
   *
   * @private
   * @returns {void}
   */
  _handleMouseLeave(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.triggerElement) {
      throw Error('Trigger element not found!');
    }

    const RELATED_TARGET = event.relatedTarget as Node;

    const HOVER_OUTSIDE_TOOLTIP =
      !RELATED_TARGET || !this.triggerElement.contains(RELATED_TARGET);

    if (HOVER_OUTSIDE_TOOLTIP) {
      this.onHidden$.next();
    }
  }
}
