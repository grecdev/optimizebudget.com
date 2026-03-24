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

import { filter, fromEvent, takeUntil, Subject } from 'rxjs';

import {
  type ComponentReferencesState,
  type ComponentReference,
  type OverlayReferenceMapKey,
  type SetReferenceInstancesOptions,
  type AppendOverlayOptions,
  type SaveOverlayReferenceOptions,
  type AppendToDOMOptions,
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

    this._initEscapeEvent();
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
   * @param {AppendOverlayOptions['projectableNodes']} options.projectableNodes - Components projected to the AppOverlayComponent.
   * @param {AppendOverlayOptions['contentReferences']} options.contentReferences - Nodes to set options to or to remove them afterward.
   * @param {AppendOverlayOptions['instanceOptions']} [options.instanceOptions] - Options assigned to the overlay's component
   *
   * @public
   * @returns {OverlayReferenceMapKey<AppOverlayComponent>}
   */
  public appendOverlay<C>(
    options: AppendOverlayOptions<C>
  ): OverlayReferenceMapKey<AppOverlayComponent> {
    const { projectableNodes, contentReferences, instanceOptions, targetDOM } = options;

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

    this._appendToDOM({
      hostView: COMPONENT_REFERENCE.hostView as EmbeddedViewRef<AppOverlayComponent>,
      targetDOM,
    });

    this._initCloseOverlayReferenceSubscription();

    return this._lastOverlayReference;
  }

  /**
   * @summary - Set instances for component reference.
   *
   * Whenever we want to access properties from children components.
   *
   * @param {SetReferenceInstancesOptions['overlayComponentReference']} options.overlayComponentReference - Overlay component.
   * @param {SetReferenceInstancesOptions['contentReferences']} options.contentReferences - All the projected content used.
   * @param {SetReferenceInstancesOptions['instanceOptions']} [options.instanceOptions] - Options assigned to whatever content we have.
   *
   * @private
   * @returns {void}
   */
  private _setReferenceInstances(options: SetReferenceInstancesOptions): void {
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
   * @param {AppendToDOMOptions['hostView]} options.hostView - Embedded host view.
   * @param {AppendToDOMOptions['targetDOM']} [options.targetDOM] - Target element where we want to inject native elements (rootNodes).
   *
   * @private
   * @returns {void}
   */
  private _appendToDOM(options: AppendToDOMOptions): void {
    const { hostView, targetDOM } = options;

    const ROOT_NODES = hostView.rootNodes.length > 0 && hostView.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Root nodes are not found in _appendOverlay!');
    }

    this._applicationReference.attachView(hostView);

    if (targetDOM) {
      targetDOM.appendChild(ROOT_NODES[0]);
    } else {
      this._document.body.appendChild(ROOT_NODES[0]);
    }
  }

  /**
   * @summary - Save unique overlay references.
   *
   * @param {SaveOverlayReferenceOptions['contentReferences']} options.contentReferences - Nodes to remove whenever we close the overlay.
   *
   * @returns {void}
   */
  private _saveOverlayReference(options: SaveOverlayReferenceOptions): void {
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

    this._lastOverlayReference.closingOverlay$
      .pipe(takeUntil(this._lastOverlayReference.completeObservable$))
      .subscribe({
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
    fromEvent<KeyboardEvent>(document, 'keydown')
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
    if (!this._lastOverlayReference) {
      throw Error('Overlay reference not foun!');
    }

    this._lastOverlayReference.complete();
  }
}
