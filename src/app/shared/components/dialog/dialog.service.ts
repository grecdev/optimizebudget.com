/**
 * This is a deprecated version, please update whenever you start a new project.
 */

import {
  type Type,
  type EmbeddedViewRef,
  type ComponentRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Injectable,
  Inject,
  createNgModule,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { type ComponentReferenceState, type DialogOptions } from './dialog.model';

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

  private _componentReference: ComponentReferenceState<T> = {
    content: null,
    dialog: null,
  };

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
    const contentRootNodes = this._createContentComponent(component);

    this._appendDialogOverlay(options, contentRootNodes);
    this._initCloseSubscription();
  }

  /**
   * @summary - Create the dialog's content component
   * and add it to the Angular's tree.
   *
   * @param {Type<T> | T} component - The component we want to project.
   *
   * @private
   * @returns {EmbeddedViewRef<T>['rootNodes']}
   */
  private _createContentComponent(
    component: Type<T> | T
  ): EmbeddedViewRef<T>['rootNodes'] {
    const COMPONENT_REFERENCE = this._componentFactoryResolver
      .resolveComponentFactory<T>(component as Type<T>)
      .create(this._injector);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<T>;
    const ROOT_NODES = HOST_VIEW.rootNodes.length > 0 && HOST_VIEW.rootNodes;

    if (!ROOT_NODES) {
      throw Error('Nodes not found!');
    }

    this._applicationReference.attachView(HOST_VIEW);

    this._componentReference.content = COMPONENT_REFERENCE;

    return ROOT_NODES;
  }

  /**
   * @summary - Create the dialog's overlay, which contains all the projected content.
   *
   * We need to use the DialogModule injector, in order to use all the providers
   * from its module's scope.
   *
   * @param {DialogOptions} options - Options for our dialog.
   * @param {EmbeddedViewRef<K>['rootNodes']} [projectableNodes = []] - External components included into the dialog.
   *
   * @private
   */
  private _appendDialogOverlay(
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
      throw Error('Root nodes are not found in _appendDialogOverlay!');
    }

    Object.assign(COMPONENT_REFERENCE.instance, options);

    this._applicationReference.attachView(HOST_VIEW);
    this._componentReference.dialog = COMPONENT_REFERENCE;
    this._document.body.append(ROOT_NODES[0]);
  }

  /**
   * @summary - Remove component from Angular's tree and from DOM.
   *
   * @param {ComponentRef<K>} componentReference - The component reference we want removed.
   *
   * @private
   * @returns {void}
   */
  private _removeComponent<K>(componentReference: ComponentRef<K> | null): void {
    if (!componentReference) {
      throw Error('Component reference not found in _removeComponent!');
    }

    this._applicationReference.detachView(componentReference.hostView);
    componentReference.destroy();
  }

  private _initCloseSubscription(): void {
    if (!this._componentReference.dialog || !this._componentReference.content) {
      throw Error('Component references not found in _initCloseSubscription!');
    }

    const subscription = this._componentReference.dialog.instance.closeDialog.subscribe(
      data => {
        this._removeComponent(this._componentReference.content);
        this._removeComponent(this._componentReference.dialog);

        subscription.unsubscribe();
      }
    );
  }
}
