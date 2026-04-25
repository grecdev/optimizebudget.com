import {
  type AfterViewInit,
  type EmbeddedViewRef,
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Injector,
  Renderer2,
} from '@angular/core';

import { AppOverlayService } from '@shared/components/overlay/overlay.service';

import { AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[appTooltip]',
  host: {
    'class': 'app-tooltip',
    '[class.attached]': 'attached',
  },
})
export class TooltipDirective implements AfterViewInit {
  private readonly _elementRef: ElementRef<HTMLElement> | null = null;
  private readonly _renderer: Renderer2;
  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _componentFactoryResolver: ComponentFactoryResolver;
  private readonly _injector: Injector;
  private readonly _applicationReference: ApplicationRef;

  /**
   * @summary - Representing whenever we attach a tooltip to the target node.
   *
   * @type {boolean}
   *
   * @public
   */
  public attached: boolean = false;

  /**
   * @summary - Check if we already initialized a `mouseleave` event.
   *
   * @type {boolean}
   *
   * @private
   */
  private _mouseLeaveInitialized: boolean = false;

  /**
   * @summary - Overlay service used to display overlays on top of everything.
   *
   * @type {AppOverlayService}
   *
   * @private
   * @readonly
   */
  private readonly _appOverlayService: AppOverlayService;

  /**
   * @summary - Overlay reference, use to react to various "behaviors".
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - An array, containing all `Renderer2` cleanup events, for destroying.
   *
   * @type {Array<() => void> =}
   *
   * @private
   * @readonly
   */
  private readonly _cleanupEventsRenderer: Array<() => void> = [];

  constructor(
    elementRef: ElementRef<HTMLElement>,
    renderer: Renderer2,
    appOverlayService: AppOverlayService,
    changeDetectorRef: ChangeDetectorRef,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector,
    applicationReference: ApplicationRef
  ) {
    this._elementRef = elementRef;
    this._renderer = renderer;
    this._appOverlayService = appOverlayService;
    this._changeDetectorRef = changeDetectorRef;
    this._componentFactoryResolver = componentFactoryResolver;
    this._injector = injector;
    this._applicationReference = applicationReference;
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

      this._changeDetectorRef.markForCheck();
      this.attached = true;

      this._createTooltipComponentReference();
      this._initMouseLeaveEvent();
      this._initCleanup();
    });

    this._cleanupEventsRenderer.push(rendererEvent);
  }

  /**
   * @summary - Event initialization for `mouseleave`.
   *
   * @private
   * @returns {void}
   */
  private _initMouseLeaveEvent(): void {
    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      throw Error('Element ref not found!');
    }

    if (this._mouseLeaveInitialized) {
      return;
    }

    console.log('_initMouseLeaveEvent');

    this._mouseLeaveInitialized = true;

    const rendererEvent = this._renderer.listen(NATIVE_ELEMENT, 'mouseleave', event => {
      event.stopPropagation();

      if (!this._overlayReference) {
        throw Error('Overlay reference not found!');
      }

      console.log(event.type);
      this._overlayReference.close();
    });

    this._cleanupEventsRenderer.push(rendererEvent);
  }

  /**
   * @summary - Close select upon closing the overlay.
   *
   * @private
   * @returns {void}
   */
  private _initCleanup(): void {
    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._overlayReference.closingOverlay$.subscribe({
      next: () => {
        this.attached = false;

        this._changeDetectorRef.markForCheck();

        this._overlayReference = null;
      },
    });
  }

  /**
   * @summary - Create a component reference using the `ComponentFactoryResolver` API.
   *
   * @private
   * @returns {void}
   */
  private _createTooltipComponentReference(): void {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory(TooltipComponent)
      .create(this._injector);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<
      typeof TooltipComponent
    >;

    this._overlayReference = this._appOverlayService.appendOverlay({
      contentReferences: [COMPONENT_REFERENCE],
      projectableNodes: [HOST_VIEW.rootNodes],
      instanceOptions: {
        noBackground: true,
      },
    });

    this._applicationReference.attachView(HOST_VIEW);
  }

  ngAfterViewInit() {
    this._initMouseEnterEvent();
  }
}
