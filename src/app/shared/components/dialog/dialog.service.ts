import {
  type Type,
  type EmbeddedViewRef,
  ComponentRef,
  TemplateRef,
  ApplicationRef,
  createNgModule,
  Injectable,
  Injector,
  ComponentFactoryResolver,
} from '@angular/core';

import { AppOverlayService } from '../overlay/overlay.service';

import { type ComponentReferencesState } from './dialog.model';
import { AppDialogModule } from './dialog.module';
import { AppDialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AppDialogService {
  private readonly _injector: Injector;
  private readonly _overlayService: AppOverlayService;
  private readonly _componentFactoryResolver: ComponentFactoryResolver;
  private readonly _applicationReference: ApplicationRef;

  /**
   * @summary - Component references used for different embedding.
   *
   * @type {ComponentReferencesState<unknown>}
   *
   * @private
   */
  private _componentReference: ComponentReferencesState<unknown> = {
    dialogProjectedContent: null,
    dialogRootComponent: null,
  };

  constructor(...args: Array<unknown>);
  constructor(
    injector: Injector,
    overlayService: AppOverlayService,
    componentFactoryResolver: ComponentFactoryResolver,
    applicationReference: ApplicationRef
  ) {
    this._injector = injector;
    this._overlayService = overlayService;
    this._componentFactoryResolver = componentFactoryResolver;
    this._applicationReference = applicationReference;
  }

  /**
   * @summary - Open an overlay component.
   *
   * @param {C} component - Component we want to inject into the overlay.
   * @param {O} [options] - Maybe our component needs dynamic data, we can change its properties with this parameter.
   * @param {E} [entry] - If we are using a module, we need to pass the exported component reference via `InjectionToken` API.
   *
   * @public
   * @returns {void}
   */
  public open<C, O, E>(component: C, options: O, entry?: E): void {
    const CONTENT_ROOT_NODES = this._createContentComponent<C, O, E>(component, entry);

    const DIALOG_ROOT_NODES = this._createDialogComponent<typeof component, O>(
      CONTENT_ROOT_NODES,
      options
    );

    const REMOVABLE_NODES = [
      this._componentReference.dialogRootComponent,
      this._componentReference.dialogProjectedContent,
    ];

    this._overlayService.appendOverlay(DIALOG_ROOT_NODES, REMOVABLE_NODES);
  }

  /**
   * @summary - Create the overlay's content component and add it to the Angular's tree.
   *
   * @param {Type<T> | T} component - The component we want to project.
   * @param {O} [options] - Maybe we want to pass whatever data to our projected content.
   * @param {E} [entry] - If we are using a module, we need to pass the exported component reference via `InjectionToken` API.
   *
   * @private
   * @returns {EmbeddedViewRef<T>['rootNodes']}
   */
  private _createContentComponent<C, O, E>(
    component: C | Type<C>,
    entry?: E
  ): EmbeddedViewRef<C>['rootNodes'] {
    let rootNodes: EmbeddedViewRef<C>['rootNodes'] = [];

    let dialogProjectedContent: typeof this._componentReference.dialogProjectedContent =
      null;

    let hostView: null | EmbeddedViewRef<C | E> = null;

    if (component instanceof TemplateRef) {
      const VIEW = component.createEmbeddedView({});

      hostView = VIEW;
      dialogProjectedContent = VIEW;

      rootNodes = VIEW.rootNodes;
    }

    if (component instanceof ComponentRef) {
      const COMPONENT_REFERENCE = this._componentFactoryResolver
        .resolveComponentFactory<C>(component as Type<C>)
        .create(this._injector);

      hostView = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<C>;

      const HAS_ROOT_NODES = hostView.rootNodes && hostView.rootNodes.length > 0;

      if (!HAS_ROOT_NODES) {
        throw Error('Nodes not found!');
      }

      dialogProjectedContent =
        COMPONENT_REFERENCE as ComponentReferencesState<C>['dialogProjectedContent'];

      rootNodes = hostView.rootNodes;
    }

    if (entry) {
      const MODULE = component as Type<C>;
      const moduleRef = createNgModule(MODULE, this._injector);

      const COMPONENT_TYPE = moduleRef.injector.get(entry);
      const COMPONENT_REFERENCE = moduleRef.componentFactoryResolver
        .resolveComponentFactory(COMPONENT_TYPE as Type<C>)
        .create(moduleRef.injector);

      hostView = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<E>;
      const ROOT_NODES = hostView.rootNodes.length > 0 && hostView.rootNodes;

      if (!ROOT_NODES) {
        throw Error('Root nodes are not found in _appendOverlay!');
      }

      dialogProjectedContent =
        COMPONENT_REFERENCE as ComponentReferencesState<C>['dialogProjectedContent'];

      rootNodes = hostView.rootNodes;
    }

    if (dialogProjectedContent) {
      this._componentReference.dialogProjectedContent = dialogProjectedContent;
    }

    if (hostView) {
      this._applicationReference.attachView(hostView);
    }

    return rootNodes;
  }

  /**
   * @summary - Create the component that contains projected content
   *
   * @param {EmbeddedViewRef<C>['rootNodes']} projectableNodes - Children
   *
   * @private
   * @returns {EmbeddedViewRef<AppDialogComponent>['rootNodes']}
   */
  private _createDialogComponent<C, O>(
    projectableNodes: EmbeddedViewRef<C>['rootNodes'],
    options: O
  ): EmbeddedViewRef<AppDialogComponent>['rootNodes'] {
    const moduleReference = createNgModule(AppDialogModule, this._injector);

    // I already know the module's entry here. No need for `injector.get(entry)`.
    const COMPONENT_REFERENCE = moduleReference.componentFactoryResolver
      .resolveComponentFactory(AppDialogComponent)
      .create(moduleReference.injector, [projectableNodes]);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<AppDialogComponent>;

    const ROOT_NODES = HOST_VIEW.rootNodes;

    if (ROOT_NODES.length === 0) {
      throw Error('Root nodes empty!');
    }

    if (Object.hasOwn(COMPONENT_REFERENCE, 'instance')) {
      Object.assign(COMPONENT_REFERENCE.instance, options);
    }

    this._componentReference.dialogRootComponent = COMPONENT_REFERENCE;
    this._applicationReference.attachView(HOST_VIEW);

    return ROOT_NODES;
  }
}
