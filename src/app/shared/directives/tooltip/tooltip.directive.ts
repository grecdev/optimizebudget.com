import {
  type AfterViewInit,
  type EmbeddedViewRef,
  type ComponentRef,
  ApplicationRef,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Injector,
  Renderer2,
  Input,
  OnDestroy,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

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
export class TooltipDirective implements AfterViewInit, OnDestroy {
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
   * @summary - Get the dynamically added component reference.
   *
   * @type {ComponentRef<TooltipComponent> | null}
   *
   * @private
   */
  private _tooltipComponentReference: ComponentRef<TooltipComponent> | null = null;

  /**
   * @summary - An array, containing all `Renderer2` cleanup events, for destroying.
   *
   * @type {Array<() => void> =}
   *
   * @private
   * @readonly
   */
  private readonly _renderer2Events: Array<() => void> = [];

  /**
   * @summary - Observer for whenever the component is destroyed.
   *
   * @type {Subject<void>}
   *
   * @private
   * @readonly
   */
  private readonly _onDestroyed$: Subject<void> = new Subject<void>();

  /**
   * @summary - Basically the tooltip "message" which will be interpolated into the template.
   *
   * @type {string}
   *
   * @public
   */
  @Input({
    required: true,
  })
  public get appTooltip(): string {
    return this._appTooltipTextContent;
  }

  set appTooltip(value: string) {
    if (!value || value === this._appTooltipTextContent) {
      return;
    }

    this._appTooltipTextContent = value;
  }

  private _appTooltipTextContent: string = '';

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

    const rendererEvent = this._renderer.listen(
      NATIVE_ELEMENT,
      'mouseenter',
      (event: MouseEvent) => {
        event.stopPropagation();

        const TOOLTIP_ALREADY_VISIBLE =
          this._tooltipComponentReference &&
          this._tooltipComponentReference.instance.isVisible;

        const NO_TOOLTIP_MESSAGE = this._appTooltipTextContent.length === 0;

        if (TOOLTIP_ALREADY_VISIBLE || NO_TOOLTIP_MESSAGE) {
          return;
        }

        this.attached = true;
        this._changeDetectorRef.markForCheck();

        this._createTooltipComponentReference();
        this._initOnHiddenSubscription();
        this._initMouseLeaveEvent();
        this._initCleanup();
      }
    );

    this._renderer2Events.push(rendererEvent);
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

    this._mouseLeaveInitialized = true;

    const rendererEvent = this._renderer.listen(
      NATIVE_ELEMENT,
      'mouseleave',
      (event: MouseEvent) => {
        event.stopPropagation();

        if (
          !this._overlayReference ||
          !this._overlayReference.overlayElement ||
          !this._tooltipComponentReference
        ) {
          throw Error('References not found!');
        }

        const RELATED_TARGET = event.relatedTarget as Node | null;

        const HOVER_OUTSIDE_TOOLTIP =
          !RELATED_TARGET ||
          !this._overlayReference.overlayElement.contains(RELATED_TARGET);

        if (HOVER_OUTSIDE_TOOLTIP) {
          this._tooltipComponentReference.instance.onHidden$.next();
        }
      }
    );

    this._renderer2Events.push(rendererEvent);
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

  /*
   * @summary - Create a component reference using the `ComponentFactoryResolver` API.
   *
   * @private
   * @returns {void}
   */
  private _createTooltipComponentReference(): void {
    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      throw Error('Element ref not found!');
    }

    this._tooltipComponentReference = this._componentFactoryResolver
      .resolveComponentFactory(TooltipComponent)
      .create(this._injector);

    const HOST_VIEW = this._tooltipComponentReference.hostView as EmbeddedViewRef<
      typeof TooltipComponent
    >;

    this._setTooltipComponentReferenceInstances();

    this._tooltipComponentReference.instance.showTooltip();

    this._overlayReference = this._appOverlayService.appendOverlay({
      contentReferences: [this._tooltipComponentReference],
      projectableNodes: [HOST_VIEW.rootNodes],
      instanceOptions: {
        noBackground: true,
      },
    });

    this._applicationReference.attachView(HOST_VIEW);
  }

  /**
   * @summary - Set instance data for our Tooltip component reference.
   *
   * @private
   * @returns {void}
   */
  private _setTooltipComponentReferenceInstances(): void {
    if (!this._tooltipComponentReference) {
      throw Error('Element ref not found!');
    }

    const NATIVE_ELEMENT = this._elementRef && this._elementRef.nativeElement;

    if (!NATIVE_ELEMENT) {
      throw Error('Element ref not found!');
    }

    this._tooltipComponentReference.instance.triggerElement = NATIVE_ELEMENT;
    this._tooltipComponentReference.instance.textContent = this._appTooltipTextContent;
  }

  /**
   * @summary - Manage the stream that emits on `mouseleave` events.
   *
   * @private
   * @returns {void}
   */
  private _initOnHiddenSubscription(): void {
    if (!this._tooltipComponentReference) {
      throw Error('Tooltip component reference not found!');
    }

    this._tooltipComponentReference.instance.onHidden$
      .pipe(takeUntil(this._onDestroyed$))
      .subscribe({
        next: () => {
          if (!this._overlayReference) {
            throw Error('Overlay reference has not been found!');
          }

          this._overlayReference.close();
        },
      });
  }

  ngAfterViewInit() {
    this._initMouseEnterEvent();
  }

  ngOnDestroy() {
    this._renderer2Events.forEach(cleanupFn => cleanupFn());

    this._onDestroyed$.next();
    this._onDestroyed$.complete();
  }
}
