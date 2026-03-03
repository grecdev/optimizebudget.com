// Future note: Please use newer syntax and features

import {
  type EmbeddedViewRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Injectable,
  Inject,
  ComponentRef,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { AppOverlayComponent } from './overlay.component';

@Injectable({
  providedIn: 'root',
})
export class AppOverlayService {
  /**
   * @summary - We need the overlay's component reference
   * in order to remove it from within its projected content.
   *
   * @type {ComponentRef<AppOverlayComponent> | null}
   *
   * @public
   */
  public overlayComponentReference: ComponentRef<AppOverlayComponent> | null = null;

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
   *
   * @public
   * @returns {void}
   */
  public appendOverlay<C>(projectableNodes: EmbeddedViewRef<C>['rootNodes']): void {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory(AppOverlayComponent)
      .create(this._injector, [projectableNodes]);

    const HOST_VIEW =
      COMPONENT_REFERENCE.hostView as EmbeddedViewRef<AppOverlayComponent>;

    const ROOT_NODES = HOST_VIEW.rootNodes.length > 0 && HOST_VIEW.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Root nodes are not found in _appendOverlay!');
    }

    this.overlayComponentReference = COMPONENT_REFERENCE;

    this._applicationReference.attachView(HOST_VIEW);
    this._document.body.append(ROOT_NODES[0]);
  }
}
