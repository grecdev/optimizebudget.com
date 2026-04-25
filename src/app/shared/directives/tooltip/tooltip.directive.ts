import { type AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

import { fromEvent } from 'rxjs';
import { AppOverlayService } from '@shared/components/overlay/overlay.service';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements AfterViewInit {
  private readonly _elementRef: ElementRef<HTMLElement> | null = null;
  private readonly _renderer: Renderer2;

  private readonly _appOverlayService: AppOverlayService;

  /**
   * @summary - An array, containing all `Renderer2` cleanup events, for destroying.
   *
   * @type {Array<() => void> =}
   *
   * @private
   * @readonly
   */
  private readonly _cleanupEventsRenderer: Array<() => void> = [];

  /**
   * @summary - Representing whenever we attach a tooltip to the target node.
   *
   * @type {boolean}
   *
   * @private
   */
  private _attached: boolean = false;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    appOverlayService: AppOverlayService
  ) {
    this._elementRef = elementRef;
    this._renderer = renderer;
    this._appOverlayService = appOverlayService;
  }

  ngAfterViewInit() {
    this._initMouseEnterEvent();
  }

  /**
   * @summary - Event initialization for `mouseenter`.
   *
   * @private
   * @returns {void}
   */
  private _initMouseEnterEvent(): void {
    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      throw Error('Element ref not found!');
    }

    const rendererEvent = this._renderer.listen(NATIVE_ELEMENT, 'mouseenter', event => {
      event.stopPropagation();

      console.log(event.type);

      this._attached = true;

      this._initMouesLeaveEvent();
    });

    this._cleanupEventsRenderer.push(rendererEvent);
  }

  /**
   * @summary - Event initialization for `mouseleave`.
   *
   * @private
   * @returns {void}
   */
  private _initMouesLeaveEvent(): void {
    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      throw Error('Element ref not found!');
    }

    const rendererEvent = this._renderer.listen(NATIVE_ELEMENT, 'mouseleave', event => {
      event.stopPropagation();

      console.log(event.type);

      this._attached = false;

      rendererEvent();
    });

    // this._cleanupEventsRenderer.push(rendererEvent);
  }
}
