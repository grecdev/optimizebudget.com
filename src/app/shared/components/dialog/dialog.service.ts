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
  createNgModule,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { type ComponentReferenceReturn, type DialogOptions } from './dialog.model';

import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService<T> {
  private readonly _componentFactoryResolver: ComponentFactoryResolver;
  private readonly _injector: Injector;
  private readonly _applicationReference: ApplicationRef;
  private readonly _document: Document;

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
      COMPONENT_REFERENCE: dialogComponentReference,
      ROOT_NODES: overlayRootNodes,
    } = this._createDialogOverlay(options, contentRootNodes);

    this._document.body.append(overlayRootNodes[0]);
  }

  /**
   * @summary - Create a component reference and add it to the Angular's tree.
   *
   * Used further to append it to the body, or whatever you want to do with it.
   *
   * @param {K} component - The component we want to project.
   *
   * @private
   * @returns {ComponentReferenceReturn<K>}
   */
  private _createComponentReference<K>(
    component: Type<K> | K
  ): ComponentReferenceReturn<K> {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory<K>(component as Type<K>)
      .create(this._injector);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<K>;
    const ROOT_NODES = HOST_VIEW.rootNodes.length > 0 && HOST_VIEW.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Nodes not found!');
    }

    this._applicationReference.attachView(HOST_VIEW);

    return {
      COMPONENT_REFERENCE,
      ROOT_NODES,
    };
  }

  /**
   * @summary - Create the dialog's overlay, which contains all the projected content.
   *
   * We need to use the DialogModule injector, in order to use all the providers
   * from the module's scope.
   *
   * @param {DialogOptions} options - Options for our dialog.
   * @param {EmbeddedViewRef<K>['rootNodes']} [projectableNodes = []] - External components included into the dialog.
   *
   * @private
   */
  private _createDialogOverlay(
    options: DialogOptions,
    projectableNodes: EmbeddedViewRef<DialogComponent>['rootNodes']
  ) {
    const moduleRef = createNgModule(DialogModule, this._injector);

    const COMPONENT_REFERENCE = moduleRef.componentFactoryResolver
      .resolveComponentFactory(DialogComponent)
      .create(moduleRef.injector, [projectableNodes]);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<DialogComponent>;
    const ROOT_NODES = HOST_VIEW.rootNodes.length > 0 && HOST_VIEW.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Root nodes are not found!');
    }

    Object.assign(COMPONENT_REFERENCE.instance, options);

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
  // public closeDialog(): void {
  //   if (!this._componentReference) {
  //     throw Error('Component reference not found!');
  //   }
  //
  //   this._applicationReference.detachView(this._componentReference.hostView);
  //   this._componentReference.destroy();
  // }
}
