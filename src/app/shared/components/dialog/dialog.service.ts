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

import { type AppDialogOptions, type ComponentReferencesState } from './dialog.model';

import { AppDialogModule, APP_DIALOG_COMPONENT_REFERENCE } from './dialog.module';

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
    contentModuleRef: null,
    dialogModuleRef: null,
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
   * @param {AppDialogOptions} options - Maybe our component needs dynamic data, we can change its properties with this parameter.
   * @param {E} [entry] - If we are using a module, we need to pass the exported component reference via `InjectionToken` API.
   *
   * @public
   * @returns {void}
   */
  public open<C, E>(component: C, options: AppDialogOptions, entry?: E): void {
    const CONTENT_ROOT_NODES = this._createContentComponent<C, E>(component, entry);

    const DIALOG_ROOT_NODES = this._createDialogComponent<typeof component>(
      CONTENT_ROOT_NODES,
      options
    );

    const CONTENT_REFERENCES = [
      this._componentReference.dialogRootComponent,
      this._componentReference.dialogProjectedContent,
      this._componentReference.dialogModuleRef,
      this._componentReference.contentModuleRef,
    ];

    this._overlayService.appendOverlay(DIALOG_ROOT_NODES, CONTENT_REFERENCES, {
      noBackground: true,
    });

    this._cleanup();
  }

  /**
   * @summary - Create the overlay's content component and add it to the Angular's tree.
   *
   * @param {C | Type<C>,} component - The component we want to project.
   * @param {E} [entry] - If we are using a module, we need to pass the exported component reference via `InjectionToken` API.
   *
   * @private
   * @returns {EmbeddedViewRef<C>['rootNodes']}
   */
  private _createContentComponent<C, E>(
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
      const moduleReference = createNgModule(MODULE, this._injector);

      const COMPONENT_TYPE = moduleReference.injector.get(entry);

      const COMPONENT_REFERENCE = moduleReference.componentFactoryResolver
        .resolveComponentFactory(COMPONENT_TYPE as Type<C>)
        .create(moduleReference.injector);

      hostView = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<E>;

      const ROOT_NODES = hostView.rootNodes.length > 0 && hostView.rootNodes;

      if (!ROOT_NODES) {
        throw Error('Root nodes are not found in _appendOverlay!');
      }

      this._componentReference.contentModuleRef = moduleReference;

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
   * @param {AppDialogOptions} options - Various options for our dialog.
   *
   * @private
   * @returns {EmbeddedViewRef<AppDialogComponent>['rootNodes']}
   */
  private _createDialogComponent<C>(
    projectableNodes: EmbeddedViewRef<C>['rootNodes'],
    options: AppDialogOptions
  ): EmbeddedViewRef<typeof APP_DIALOG_COMPONENT_REFERENCE>['rootNodes'] {
    const moduleReference = createNgModule(AppDialogModule, this._injector);

    const COMPONENT_TYPE = moduleReference.injector.get(APP_DIALOG_COMPONENT_REFERENCE);

    // I already know the module's entry here. No need for `injector.get(entry)`.
    const COMPONENT_REFERENCE = moduleReference.componentFactoryResolver
      .resolveComponentFactory(COMPONENT_TYPE)
      .create(moduleReference.injector, [projectableNodes]);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<
      typeof COMPONENT_TYPE
    >;

    const ROOT_NODES = HOST_VIEW.rootNodes;

    if (ROOT_NODES.length === 0) {
      throw Error('Root nodes empty!');
    }

    if (Object.hasOwn(COMPONENT_REFERENCE, 'instance')) {
      Object.assign(COMPONENT_REFERENCE.instance, options);
    }

    this._componentReference.dialogModuleRef = moduleReference;
    this._componentReference.dialogRootComponent = COMPONENT_REFERENCE;
    this._applicationReference.attachView(HOST_VIEW);

    return ROOT_NODES;
  }

  /**
   * @summary - Cleanup whatever I don't need anymore, to avoid leaks.
   *
   * This usually it's called after you successfully appended the overlay.
   *
   * @private
   * @returns {void}
   */
  private _cleanup(): void {
    Object.keys(this._componentReference).forEach(key => {
      this._componentReference[key as keyof typeof this._componentReference] = null;
    });
  }
}
