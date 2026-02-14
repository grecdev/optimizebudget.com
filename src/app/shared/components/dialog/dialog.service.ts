/**
 * This is a deprecated version, please update whenever you start a new project.
 */

import {
  type Type,
  type EmbeddedViewRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Injectable,
  Inject,
  ComponentRef,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService<T> {
  private readonly _componentFactoryResolver: ComponentFactoryResolver;
  private readonly _injector: Injector;
  private readonly _applicationReference: ApplicationRef;
  private readonly _document: Document;

  private _componentReference: ComponentRef<T> | null = null;

  constructor(...args: Array<unknown>);
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    appInjector: Injector,
    appRef: ApplicationRef,
    @Inject(DOCUMENT) document: Document
  ) {
    this._componentFactoryResolver = componentFactoryResolver;
    this._injector = appInjector;
    this._applicationReference = appRef;
    this._document = document;
  }

  /**
   * @summary - Open a modal component.
   *
   * @param {T} component - Component we want to inject into the modal.
   *
   * @public
   * @returns {void}
   */
  public open(component: T): void {
    // this._componentReference = this._componentFactoryResolver
    //   .resolveComponentFactory<T>(component as Type<T>)
    //   .create(this._injector);
    // const HOST_VIEW = this._componentReference.hostView as EmbeddedViewRef<T>;
    // this._applicationReference.attachView(HOST_VIEW);
    // if (HOST_VIEW.rootNodes.length === 0) {
    //   throw Error('Nodes not found!');
    // }
    // const COMPONENT_TEMPLATE: HTMLElement = HOST_VIEW.rootNodes[0];
    // this._document.body.append(COMPONENT_TEMPLATE);
    // Here create a subscriber, accessing the onCloseDialog method from component's reference.
    // And execute the cleanup function in that subscriber.

    const DIALOG_OVERLAY_REFERENCE = this._createDialogOverlay();
  }

  /**
   * @summary - Create the dialog's overlay, where we will project our content.
   *
   * @private
   * @returns {ComponentRef<DialogComponent>}
   */
  private _createDialogOverlay(): ComponentRef<DialogComponent> {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory(DialogComponent)
      .create(this._injector);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<DialogComponent>;

    if (HOST_VIEW.rootNodes.length === 0) {
      throw Error('Root nodes not found in DialogComponent!');
    }

    const COMPONENT_TEMPLATE: HTMLElement = HOST_VIEW.rootNodes[0];

    this._applicationReference.attachView(HOST_VIEW);
    this._document.body.append(COMPONENT_TEMPLATE);

    return COMPONENT_REFERENCE;
  }

  /**
   * @summary - Close dialog from within children component.
   *
   * @returns {void}
   */
  public closeDialog(): void {
    if (!this._componentReference) {
      throw Error('Component reference not found!');
    }

    this._applicationReference.detachView(this._componentReference.hostView);
    this._componentReference.destroy();
  }
}
