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
   * @summary - We need to check if the current ID has reached its threshold right?
   *
   * @type {number}
   *
   * @private
   */
  private readonly _defaultValueID: number = 0;

  /**
   * @summary - Used whenever we remove the last overlay added to the DOM.
   *
   * Start value from 0, because it needs to be the same count as `new Map().size`.
   *
   * @type {number}
   *
   * @private
   */
  private _currentID: number = this._defaultValueID;

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
   * @param {EmbeddedViewRef<C>['rootNodes']} projectableNodes - External components included into the overlay.
   * @param {Array<unknown>} removableNodesReferences - Nodes we want to remove
   * whenever we trigger the close event from the overlay component.
   * @param {AppOverlayComponentOptions} [options] - Options assigned to the overlay's component
   *
   * @public
   * @returns {void}
   */
  public appendOverlay<C>(
    projectableNodes: EmbeddedViewRef<C>['rootNodes'],
    removableNodesReferences: ComponentReferencesState,
    options?: AppOverlayComponentInstances['options']
  ): OverlayReference<ComponentRef<AppOverlayComponent>> {
    this._currentID++;

    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory(AppOverlayComponent)
      .create(this._injector, [projectableNodes]);

    const REMOVABLE_NODES = [COMPONENT_REFERENCE, ...removableNodesReferences];

    const LAST_OVERLAY_REFERENCE = new OverlayReference<typeof COMPONENT_REFERENCE>();

    if (options) {
      this._setReferenceOptions({
        componentReference: COMPONENT_REFERENCE,
        instanceOptions: options,
        lastOverlayReference: LAST_OVERLAY_REFERENCE,
      });
    }

    this._saveOverlayReference({
      removableNodes: REMOVABLE_NODES,
    });

    this._appendToDOM(
      COMPONENT_REFERENCE.hostView as EmbeddedViewRef<AppOverlayComponent>
    );

    this._initCloseSubscription({
      lastOverlayReference: LAST_OVERLAY_REFERENCE,
    });

    return LAST_OVERLAY_REFERENCE;
  }

  /**
   * @summary - Set instances for component reference.
   *
   * @private
   * @returns {void}
   */
  private _setReferenceOptions(options: {
    componentReference: ComponentRef<AppOverlayComponent>;
    instanceOptions: AppOverlayComponentInstances['options'];
    lastOverlayReference: OverlayReferenceMapKey<AppOverlayComponent>;
  }): void {
    const { componentReference, instanceOptions, lastOverlayReference } = options;

    if (
      Object.hasOwn(componentReference, 'instance') &&
      Object.hasOwn(componentReference.instance, 'options')
    ) {
      Object.assign(componentReference.instance.options, instanceOptions);
    }
    if (Object.hasOwn(componentReference.instance, 'overlayReference')) {
      componentReference.instance.overlayReference = lastOverlayReference;
    }
  }

  /**
   * @summary - Append our newly created overlay to the DOM (both HTML and Virtual)
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
   * @param {OverlayReference<AppOverlayComponent>} options.overlayReference - Nodes to remove whenever we close the overlay.
   * @param {ComponentReferencesState} options.removableNodes - Nodes to remove whenever we close the overlay.
   *
   * @returns {void}
   */
  private _saveOverlayReference(options: {
    removableNodes: ComponentReferencesState;
  }): void {
    const { removableNodes } = options;

    if (
      this._currentID === this._defaultValueID ||
      this._overlayReferenceStack.has(this._currentID)
    ) {
      return;
    }

    this._overlayReferenceStack.set(this._currentID, removableNodes);
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
   * @summary - Initialize our closing subscription.
   *
   * @param {OverlayReferenceMapKey<AppOverlayComponent>} options.lastOverlayReference - Last overlay reference.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(options: {
    lastOverlayReference: OverlayReferenceMapKey<AppOverlayComponent>;
  }): void {
    const { lastOverlayReference } = options;

    lastOverlayReference.closingOverlay$.subscribe({
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

        if (this._currentID > this._defaultValueID) {
          this._currentID--;
        }
      },
    });
  }
}
