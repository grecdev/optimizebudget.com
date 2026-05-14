import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Subject } from 'rxjs';

import { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

@Component({
  selector: 'app-tooltip-content-container',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-tooltip-content-container',
    '(mouseleave)': '_handleMouseLeave($event)',
  },
})
export class TooltipComponent
  implements AppOverlayContentInstances, AfterViewInit, OnDestroy
{
  private readonly _elementRef: ElementRef<HTMLElement> | null = null;

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

  constructor(elementRef: ElementRef<HTMLElement>) {
    this._elementRef = elementRef;
  }

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

  /**
   * @summary - Set styling for the native element.
   *
   * @private
   * @returns {void}
   */
  private _setNativeElementStyle(): void {
    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!this.triggerElement || !NATIVE_ELEMENT) {
      throw Error('DOM Tree elements not found!');
    }

    const { width: WIDTH_NATIVE_ELEMENT } = NATIVE_ELEMENT.getBoundingClientRect();

    const {
      top: TOP_TRIGGER_ELEMENT,
      left: LEFT_TRIGGER_ELEMENT,
      height: HEIGHT_TRIGGER_ELEMENT,
      width: WIDTH_TRIGGER_ELEMENT,
    } = this.triggerElement.getBoundingClientRect();

    const MIDDLE_POINT = (WIDTH_TRIGGER_ELEMENT - WIDTH_NATIVE_ELEMENT) / 2;
    const POS_X = LEFT_TRIGGER_ELEMENT + MIDDLE_POINT;
    const POS_Y = TOP_TRIGGER_ELEMENT + HEIGHT_TRIGGER_ELEMENT;

    Object.assign(NATIVE_ELEMENT.style, {
      top: `${POS_Y}px`,
      left: `${POS_X}px`,
    });
  }

  ngAfterViewInit() {
    this._setNativeElementStyle();
  }

  ngOnDestroy() {
    this.isVisible = false;
  }
}
