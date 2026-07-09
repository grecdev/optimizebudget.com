import {
  type EmbeddedViewRef,
  ApplicationRef,
  createNgModule,
  Injectable,
  Injector,
} from '@angular/core';

import { AppOverlayService } from '@shared/components/overlay/overlay.service';
import { type OverlayReferenceMapKey } from '@shared/components/overlay/overlay.model';

import {
  type ComponentReferencesState,
  type CreateSnackbarModuleOptions,
  type OpenOptions,
} from './snackbar.model';

import { APP_SNACKBAR_COMPONENT_REFERENCE, AppSnackbarModule } from './snackbar.module';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly _injector: Injector;
  private readonly _appOverlayService: AppOverlayService;
  private readonly _applicationReference: ApplicationRef;

  /**
   * @summary - Component references used for different embedding.
   *
   * @type {ComponentReferencesState}
   *
   * @private
   */
  private _componentReference: ComponentReferencesState = {
    snackbarModuleRef: null,
    snackbarComponentRef: null,
  };

  constructor(
    injector: Injector,
    overlayService: AppOverlayService,
    applicationReference: ApplicationRef
  ) {
    this._injector = injector;
    this._appOverlayService = overlayService;
    this._applicationReference = applicationReference;
  }

  /**
   * @summary - Open a snackbar component.
   *
   * @param {OpenOptions} options - Maybe our component needs dynamic data, we can change its properties with this parameter.
   *
   * @public
   * @returns {OverlayReferenceMapKey<typeof APP_SNACKBAR_COMPONENT_REFERENCE>}
   */
  public open(
    options: OpenOptions
  ): OverlayReferenceMapKey<typeof APP_SNACKBAR_COMPONENT_REFERENCE> {
    const DIALOG_ROOT_NODES = this._createSnackbarModule(options);

    const OVERLAY_REFERENCE = this._appOverlayService.appendOverlay({
      contentReferences: [],
      projectableNodes: DIALOG_ROOT_NODES,
      instanceOptions: {
        noBackground: true,
      },
    });

    return OVERLAY_REFERENCE;
  }

  /**
   * @summary - Create the module reference.
   *
   * @param {CreateSnackbarModuleOptions} options - Various options.
   *
   * @private
   * @returns {EmbeddedViewRef<typeof APP_SNACKBAR_COMPONENT_REFERENCE>['rootNodes']}
   */
  private _createSnackbarModule(
    options: CreateSnackbarModuleOptions
  ): EmbeddedViewRef<typeof APP_SNACKBAR_COMPONENT_REFERENCE>['rootNodes'] {
    const moduleReference = createNgModule(AppSnackbarModule, this._injector);

    const COMPONENT_TYPE = moduleReference.injector.get(APP_SNACKBAR_COMPONENT_REFERENCE);

    // I already know the module's entry here. No need for `injector.get(entry)`.
    const COMPONENT_REFERENCE = moduleReference.componentFactoryResolver
      .resolveComponentFactory(COMPONENT_TYPE)
      .create(moduleReference.injector);

    const HOST_VIEW = COMPONENT_REFERENCE.hostView as EmbeddedViewRef<typeof COMPONENT_TYPE>;

    const ROOT_NODES = HOST_VIEW.rootNodes;

    if (ROOT_NODES.length === 0) {
      throw Error('Root nodes empty!');
    }

    if (Object.hasOwn(COMPONENT_REFERENCE, 'instance')) {
      Object.assign(COMPONENT_REFERENCE.instance, options);
    }

    this._componentReference.snackbarModuleRef = moduleReference;
    this._componentReference.snackbarComponentRef = COMPONENT_REFERENCE;

    this._applicationReference.attachView(HOST_VIEW);

    return ROOT_NODES;
  }
}
