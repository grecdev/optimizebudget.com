import {
  type EmbeddedViewRef,
  type TemplateRef,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';
import { AppOverlayService } from '@shared/components/overlay/overlay.service';

import { AppFormFieldControl } from '../form-field/form-field-control';

import { type SetOptionsContainerStyleOptions } from './select.model';

@Component({
  selector: 'app-form-field app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: AppFormFieldControl,
      useExisting: AppSelectComponent,
    },
  ],
  host: {
    class: 'app-select',
  },
})
export class AppSelectComponent implements AppFormFieldControl {
  private readonly _overlayService: AppOverlayService;
  private readonly _iconRegistryService: IconRegistryService;
  private readonly _domSanitizer: DomSanitizer;
  private readonly _changeDetectorRef: ChangeDetectorRef;

  /**
   * @summary - Overlay reference.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    'caret-down': 'caret-down',
    'caret-up': 'caret-up',
  };

  /**
   * @summary - Based on this variable, we change the select element's UI
   *
   * @type {boolean}
   *
   * @public
   */
  public focused: boolean = false;

  @ViewChild('selectOptionsContainer')
  private readonly _selectOptionsContainer: TemplateRef<void> | null = null;

  /**
   * @summary - As always, pass a unique identifier.
   *
   * @type {string}
   *
   * @public
   */
  @Input()
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _id: string = '';

  constructor(
    iconRegistryService: IconRegistryService,
    domSanitizer: DomSanitizer,
    overlayService: AppOverlayService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;
    this._overlayService = overlayService;
    this._changeDetectorRef = changeDetectorRef;

    this._initIconRegistry();
  }

  /**
   * @summary - Registry icons used in this component.
   *
   * @private
   * @returns {void}
   */
  private _initIconRegistry(): void {
    Object.values(this.icons).forEach(item => {
      this._iconRegistryService.addSvgIconConfig({
        name: item,
        url: this._domSanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/${item}.svg`
        ),
      });
    });
  }

  @HostListener('click', ['$event']) handleClick(event: MouseEvent): void {
    event.stopPropagation();

    const CURRENT_TARGET = event.currentTarget as HTMLElement;

    if (!this._selectOptionsContainer || !CURRENT_TARGET) {
      throw Error('Elements not found!');
    }

    this.focused = true;

    const OPTIONS_EMBEDDED_VIEW = this._createOptionsContainerEmbedded();

    this._setOptionsContainerStyle({
      optionsContainer: OPTIONS_EMBEDDED_VIEW,
      currentTarget: CURRENT_TARGET,
    });

    this._overlayReference = this._overlayService.appendOverlay({
      contentReferences: [OPTIONS_EMBEDDED_VIEW],
      projectableNodes: [OPTIONS_EMBEDDED_VIEW.rootNodes],
      targetDOM: CURRENT_TARGET,
      instanceOptions: {
        noBackground: true,
      },
    });

    this._initCloseSubscription();
  }

  /**
   * @summary - Instantiate the overlay container options embedded view.
   *
   * @private
   * @returns {EmbeddedViewRef<void>}
   */
  private _createOptionsContainerEmbedded(): EmbeddedViewRef<void> {
    if (!this._selectOptionsContainer) {
      throw Error('_selectOptionsContainer not found!');
    }

    const VIEW = this._selectOptionsContainer.createEmbeddedView();

    const ROOT_NODES = VIEW.rootNodes;

    if (!ROOT_NODES || ROOT_NODES.length === 0) {
      throw Error('Root nodes not found in select!');
    }

    return VIEW;
  }

  /**
   * @summary - Set styling for the native element.
   *
   * @param {SetOptionsContainerStyleOptions['optionsContainer']} options.optionsContainer - HTML container of all option elements.
   * @param {SetOptionsContainerStyleOptions['currentTarget']} options.currentTarget - Clicked target.
   *
   * @private
   * @returns {void}
   */
  private _setOptionsContainerStyle(options: SetOptionsContainerStyleOptions): void {
    const { optionsContainer, currentTarget } = options;

    const { top, left, height } = currentTarget.getBoundingClientRect();

    const NATIVE_ELEMENT = optionsContainer.rootNodes[0] as HTMLElement;

    Object.assign(NATIVE_ELEMENT.style, {
      top: `${top + height}px`,
      left: `${left}px`,
    });
  }

  /**
   * @summary - Close select upon closing the overlay.
   *
   * @private
   * @returns {void}
   */
  private _initCloseSubscription(): void {
    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._overlayReference.closingOverlay$.subscribe({
      next: () => {
        this.focused = false;
        this._changeDetectorRef.markForCheck();
        this._overlayReference = null;
      },
    });
  }
}
