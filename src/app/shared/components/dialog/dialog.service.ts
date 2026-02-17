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

import { type ComponentReferenceReturn, type DialogOptions } from './dialog.model';

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
   * @summary - Open a dialog component.
   *
   * @param {T} component - Component we want to inject into the dialog.
   * @param {DialogOptions} options - Options for our dialog.
   *
   * @public
   * @returns {void}
   */
  public open(component: T, options: DialogOptions): void {
    const {
      COMPONENT_REFERENCE: contentComponentReference,
      ROOT_NODES: contentRootNodes,
    } = this._createComponentReference<T>(component);

    const {
      COMPONENT_REFERENCE: overlayComponentReference,
      ROOT_NODES: overlayRootNodes,
    } = this._createComponentReference<DialogComponent>(
      DialogComponent,
      contentRootNodes
    );

    if (options.title) {
      overlayComponentReference.instance.title = options.title;
    }

    this._document.body.append(overlayRootNodes[0]);
  }

  /**
   * @summary - Create a component reference and add it to the Angular's tree.
   *
   * Used further to append it to the body, or whatever you want to do with it.
   *
   * @param {K} component - The component we want to project.
   * @param {EmbeddedViewRef<K>['rootNodes']} [projectableNodes = []] - External components included into the dialog.
   *
   * @private
   * @returns {ComponentReferenceReturn<K>}
   */
  private _createComponentReference<K>(
    component: Type<K> | K,
    projectableNodes: EmbeddedViewRef<K>['rootNodes'] = []
  ): ComponentReferenceReturn<K> {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory<K>(component as Type<K>)
      .create(this._injector, [projectableNodes]);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<K>;

    if (HOST_VIEW.rootNodes.length === 0) {
      throw Error('Nodes not found!');
    }

    const ROOT_NODES = HOST_VIEW.rootNodes;

    this._applicationReference.attachView(HOST_VIEW);

    return {
      COMPONENT_REFERENCE,
      ROOT_NODES,
    };
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
