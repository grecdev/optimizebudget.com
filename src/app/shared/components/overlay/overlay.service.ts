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
  type AppOverlayContentInstances,
  type AppOverlayComponentInstances,
  type ComponentReference,
} from './overlay.model';

import { AppOverlayComponent } from './overlay.component';

@Injectable({
  providedIn: 'root',
})
export class AppOverlayService {
  /**
   * @summary - To remove the reference afterward.
   *
   * @type {ComponentReferencesState}
   *
   * @private
   */
  private _componentReferences: ComponentReferencesState = [];

  private readonly _componentFactoryResolver: ComponentFactoryResolver;
  private readonly _injector: Injector;
  private readonly _applicationReference: ApplicationRef;
  private readonly _document: Document;

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
  ): void {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory(AppOverlayComponent)
      .create(this._injector, [projectableNodes]);

    const HOST_VIEW =
      COMPONENT_REFERENCE.hostView as EmbeddedViewRef<AppOverlayComponent>;

    const ROOT_NODES = HOST_VIEW.rootNodes.length > 0 && HOST_VIEW.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Root nodes are not found in _appendOverlay!');
    }

    if (
      options &&
      Object.hasOwn(COMPONENT_REFERENCE, 'instance') &&
      Object.hasOwn(COMPONENT_REFERENCE.instance, 'options')
    ) {
      Object.assign(COMPONENT_REFERENCE.instance.options, options);
    }

    this._componentReferences.push(COMPONENT_REFERENCE, ...removableNodesReferences);

    this._applicationReference.attachView(HOST_VIEW);
    this._document.body.append(ROOT_NODES[0]);

    this._initCloseSubscription();
  }

  /**
   * @summary - Remove component from Angular's tree and from DOM.
   *
   * @param {ComponentRef<K> | EmbeddedViewRef<T> | null} componentReference - The component reference we want removed.
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
   * @summary - Subscription for closing the rendered elements.
   *
   * @param {EmbeddedViewRef<AppDialogComponent>['rootNodes']} closeInstance - Event emitter from within the component
   *
   * @private
   * @returns {void}
   */
  private _subscribeCloseEvent(closeInstance: AppOverlayContentInstances['close']): void {
    const SUBSCRIPTION = closeInstance.subscribe(() => {
      const MISSING_REFERENCES = this._componentReferences.some(item => !item);

      if (MISSING_REFERENCES) {
        throw Error('Component references not found in _subscribeCloseEvent!');
      }

      this._componentReferences.forEach(item => {
        this._removeComponent(item);
      });

      SUBSCRIPTION.unsubscribe();

      this._cleanup();
    });
  }

  /**
   * @summary - Initialize our closing subscription.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(): void {
    const MISSING_REFERENCES = this._componentReferences.some(item => !item);

    if (MISSING_REFERENCES) {
      throw Error('Component references not found in _initCloseSubscription!');
    }

    this._componentReferences.forEach(item => {
      if (
        item instanceof ComponentRef &&
        item.instance &&
        Object.hasOwn(item.instance, 'close')
      ) {
        this._subscribeCloseEvent(item.instance.close);
      }
    });
  }

  /**
   * @summary - Cleanup whatever I don't need anymore, to avoid leaks.
   *
   * This usually it's called after you successfully triggered the close events.
   *
   * @private
   * @returns {void}
   */
  private _cleanup(): void {
    this._componentReferences = [];
  }
}
