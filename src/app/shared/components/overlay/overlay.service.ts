// Future note: Please use newer syntax and features

import {
  type EmbeddedViewRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Injectable,
  Inject,
  ComponentRef,
  NgModuleRef,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { filter, fromEvent, type Subscription } from 'rxjs';

import {
  type ComponentReferencesState,
  type AppOverlayComponentInstances,
  type ComponentReference,
  type OverlayReferenceMapKey,
} from './overlay.model';

import { AppOverlayComponent } from './overlay.component';
import { OverlayReference } from './overlay-reference';

@Injectable({
  providedIn: 'root',
})
export class AppOverlayService {
  private readonly _componentFactoryResolver: ComponentFactoryResolver;
  private readonly _injector: Injector;
  private readonly _applicationReference: ApplicationRef;
  private readonly _document: Document;

  /**
   * @summary - Overlay reference used throughout the service.
   *
   * @type {OverlayReferenceMapKey<AppOverlayComponent> | null}
   *
   * @private
   */
  private _lastOverlayReference: OverlayReferenceMapKey<AppOverlayComponent> | null =
    null;

  /**
   * @summary - Rxjs subscription.
   *
   * @type {Subscription | null} this._rxjsSubscriptions.keydown
   * @type {Subscription | null} this._rxjsSubscriptions.closingOverlay
   *
   * @private
   */
  private readonly _rxjsSubscriptions: {
    keydown: Subscription | null;
    closingOverlay: Subscription | null;
  } = {
    keydown: null,
    closingOverlay: null,
  };

  /**
   * @summary - We need to check if the current ID has reached its threshold right?
   *
   * @type {number}
   *
   * @private
   */
  private readonly _stackMinimumThreshold: number = 0;

  /**
   * @summary - Used whenever we remove the last overlay added to the DOM.
   *
   * Start value from 0, because it needs to be the same count as `new Map().size`.
   *
   * @type {number}
   *
   * @private
   */
  private _currentID: number = this._stackMinimumThreshold;

  /**
   * @summary - This store it's used in order to render multiple overlay at the same time.
   *
   * LIFO.
   *
   * @type {Map<typeof this._currentID, ComponentReferencesState>}
   *
   * @private
   */
  private _overlayReferenceStack: Map<typeof this._currentID, ComponentReferencesState> =
    new Map<typeof this._currentID, ComponentReferencesState>();

  constructor(...args: Array<unknown>);
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    appInjector: Injector,
    applicationReference: ApplicationRef,
    @Inject(DOCUMENT) document: Document
  ) {
    this._componentFactoryResolver = componentFactoryResolver;
    this._injector = appInjector;
    this._applicationReference = applicationReference;
    this._document = document;
  }

  /**
   * @summary - Create the overlay, which contains all the projected content.
   *
   * The projected content is always created outside this service.
   * Why so? Because we can have 3 different types of nodes:
   *
   * 1. Simple template HTML (component.html)
   * 2. @Component
   * 3. @NgModule
   *
   * @param {EmbeddedViewRef<C>['rootNodes']} options.projectableNodes - Components projected to the AppOverlayComponent.
   * @param {Array<unknown>} options.contentReferences - Nodes to set options to or to remove them afterward.
   * @param {AppOverlayComponentOptions} [options.instanceOptions] - Options assigned to the overlay's component
   *
   * @public
   * @returns {OverlayReferenceMapKey<AppOverlayComponent>}
   */
  public appendOverlay<C>(options: {
    projectableNodes: EmbeddedViewRef<C>['rootNodes'];
    contentReferences: ComponentReferencesState;
    instanceOptions?: AppOverlayComponentInstances['options'];
  }): OverlayReferenceMapKey<AppOverlayComponent> {
    const { projectableNodes, contentReferences, instanceOptions } = options;

    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory(AppOverlayComponent)
      .create(this._injector, [projectableNodes]);

    const CONTENT_REFERENCES = [COMPONENT_REFERENCE, ...contentReferences];

    this._lastOverlayReference = new OverlayReference<typeof COMPONENT_REFERENCE>();

    this._setReferenceInstances({
      overlayComponentReference: COMPONENT_REFERENCE,
      contentReferences: CONTENT_REFERENCES,
      instanceOptions,
    });

    this._saveOverlayReference({
      contentReferences: CONTENT_REFERENCES,
    });

    this._appendToDOM(
      COMPONENT_REFERENCE.hostView as EmbeddedViewRef<AppOverlayComponent>
    );

    this._initCloseOverlayReferenceSubscription();

    if (this._overlayReferenceStack.size === 1) {
      this._initEscapeEvent();
    }

    return this._lastOverlayReference;
  }

  /**
   * @summary - Set instances for component reference.
   *
   * Whenever we want to access properties from children components.
   *
   * @param {ComponentRef<AppOverlayComponent>} options.overlayComponentReference - Overlay component.
   * @param {ComponentReferencesState} options.contentReferences - All the projected content used.
   * @param {AppOverlayComponentInstances['options']} [options.instanceOptions] - Options assigned to whatever content we have.
   *
   * @private
   * @returns {void}
   */
  private _setReferenceInstances(options: {
    overlayComponentReference: ComponentRef<AppOverlayComponent>;
    contentReferences: ComponentReferencesState;
    instanceOptions?: AppOverlayComponentInstances['options'];
  }): void {
    if (!this._lastOverlayReference) {
      throw Error('Overlay reference not found!');
    }

    const { contentReferences, instanceOptions, overlayComponentReference } = options;

    contentReferences.forEach(item => {
      if (
        item &&
        item instanceof ComponentRef &&
        Object.hasOwn(item.instance, 'overlayReference')
      ) {
        item.instance.overlayReference = this._lastOverlayReference;
      }
    });

    if (
      instanceOptions &&
      Object.hasOwn(overlayComponentReference, 'instance') &&
      Object.hasOwn(overlayComponentReference.instance, 'options')
    ) {
      Object.assign(overlayComponentReference.instance.options, instanceOptions);
    }
  }

  /**
   * @summary - Append our newly created overlay to the DOM
   *
   * (both HTML and Virtual)
   *
   * @param {EmbeddedViewRef<AppOverlayComponent>} hostView - Host view.
   *
   * @private
   * @returns {void}
   */
  private _appendToDOM(hostView: EmbeddedViewRef<AppOverlayComponent>): void {
    const ROOT_NODES = hostView.rootNodes.length > 0 && hostView.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Root nodes are not found in _appendOverlay!');
    }

    this._applicationReference.attachView(hostView);
    this._document.body.append(ROOT_NODES[0]);
  }

  /**
   * @summary - Save unique overlay references.
   *
   * @param {ComponentReferencesState} options.contentReferences - Nodes to remove whenever we close the overlay.
   *
   * @returns {void}
   */
  private _saveOverlayReference(options: {
    contentReferences: ComponentReferencesState;
  }): void {
    const { contentReferences } = options;

    this._currentID++;

    if (
      this._currentID === this._stackMinimumThreshold ||
      this._overlayReferenceStack.has(this._currentID)
    ) {
      return;
    }

    this._overlayReferenceStack.set(this._currentID, contentReferences);
  }

  /**
   * @summary - Remove component from Angular's tree and from DOM.
   *
   * @param {ComponentReference} componentReference - The component reference we want removed.
   *
   * @private
   * @returns {void}
   */
  private _removeComponent(componentReference: ComponentReference): void {
    if (!componentReference) {
      throw Error('Component reference not found in _removeComponent!');
    }

    const IS_COMPONENT_REF = componentReference instanceof ComponentRef;
    const IS_NG_MODULE_REF = componentReference instanceof NgModuleRef;

    if (!IS_NG_MODULE_REF) {
      this._applicationReference.detachView(
        IS_COMPONENT_REF ? componentReference.hostView : componentReference
      );
    }

    componentReference.destroy();
  }

  /**
   * @summary - Initialize our closing subscription, for individual overlay refernce.
   *
   * Hence, executing this whenever we append a new overlay.
   *
   * @private
   * @returns {void}
   */
  private _initCloseOverlayReferenceSubscription(): void {
    if (!this._lastOverlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._rxjsSubscriptions.closingOverlay =
      this._lastOverlayReference.closingOverlay$.subscribe({
        next: () => {
          const COMPONENT_REFERENCES =
            this._overlayReferenceStack.has(this._overlayReferenceStack.size) &&
            this._overlayReferenceStack.get(this._overlayReferenceStack.size);

          if (!COMPONENT_REFERENCES) {
            return;
          }

          COMPONENT_REFERENCES.forEach(item => {
            this._removeComponent(item);
          });

          this._overlayReferenceStack.delete(this._overlayReferenceStack.size);

          if (this._currentID > this._stackMinimumThreshold) {
            this._currentID--;
          }

          if (this._overlayReferenceStack.size <= this._stackMinimumThreshold) {
            this._cleanup();
          }
        },
      });
  }

  /**
   * @summary - Subscription for pressing the ESCAPE key to close the overlay.
   *
   * @private
   * @returns {void}
   */
  private _initEscapeEvent(): void {
    this._rxjsSubscriptions.keydown = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(event => {
          const ALLOWED_KEYS = ['Escape'];

          return ALLOWED_KEYS.includes(event.key);
        })
      )
      .subscribe({
        next: () => {
          if (!this._lastOverlayReference) {
            throw Error('Overlay reference not found!');
          }

          this._lastOverlayReference.close();
        },
      });
  }

  /**
   * @summary - Cleanup everything when there are no overlays rendered anymore.
   *
   * @private
   */
  private _cleanup(): void {
    Object.keys(this._rxjsSubscriptions).forEach(key => {
      const SUBSCRIPTION =
        this._rxjsSubscriptions[key as keyof typeof this._rxjsSubscriptions];

      if (SUBSCRIPTION) {
        SUBSCRIPTION.unsubscribe();
      }
    });
  }
}
