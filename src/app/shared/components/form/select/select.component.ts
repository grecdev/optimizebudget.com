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
  forwardRef,
  Optional,
  Self,
  AfterContentInit,
  QueryList,
  ContentChildren,
} from '@angular/core';

import { ControlValueAccessor, NgControl } from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';

import { type AppOverlayContentInstances } from '@shared/components/overlay/overlay.model';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';
import { AppOverlayService } from '@shared/components/overlay/overlay.service';

import { AppFormFieldControl } from '../form-field/form-field-control';

import { AppSelectOptionComponent } from './select-option/select-option.component';

import {
  type SetOptionsContainerStyleOptions,
  type HandleOptionChangeOptions,
} from './select.model';

import { APP_SELECT_COMPONENT_REFERENCE } from './select.tokens';
import { iconAnimation } from './select-animations.component';

@Component({
  selector: 'app-form-field app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: AppFormFieldControl,
      useExisting: forwardRef(() => AppSelectComponent),
    },
    {
      provide: APP_SELECT_COMPONENT_REFERENCE,
      useExisting: forwardRef(() => AppSelectComponent),
    },
  ],
  host: {
    class: 'app-select',
  },
  animations: [iconAnimation],
})
export class AppSelectComponent
  implements AppFormFieldControl, ControlValueAccessor, AfterContentInit
{
  private readonly _domSanitizer: DomSanitizer;
  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _ngControl: NgControl;

  /**
   * @summary - Overlay service used to display overlays on top of everything.
   *
   * @type {AppOverlayService}
   *
   * @private
   * @readonly
   */
  private readonly _overlayService: AppOverlayService;

  /**
   * @summary - Icon registry service, used to store icons and then render them in template.
   *
   * @type {IconRegistryService}
   *
   * @private
   * @readonly
   */
  private readonly _iconRegistryService: IconRegistryService;

  /**
   * @summary - Overlay reference, to subscribe on events.
   *
   * @type {AppOverlayContentInstances['overlayReference']}
   *
   * @private
   */
  private _overlayReference: AppOverlayContentInstances['overlayReference'] = null;

  /**
   * @summary - Value selected via CVA's API.
   *
   * @type {string}
   *
   * @private
   */
  private _currentValue: string = '';

  /**
   * @summary - Value rendered after clicking an option.
   *
   * @type {string}
   *
   * @public
   */
  public currentValueTextContent: string = '';

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    'caret-down': 'caret-down',
  };

  /**
   * @summary - Based on this variable, we change the select element's UI.
   *
   * Part of the `AppFormFieldControl` class.
   *
   * @type {AppFormFieldControl['focused']}
   *
   * @public
   */
  public focused: AppFormFieldControl['focused'] = false;

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

  /**
   * @summary - Rendered `app-select-option` elements container.
   *
   * @type {TemplateRef<void> | null}
   *
   * @private
   * @readonly
   */
  @ViewChild('selectOptionsContainer')
  private readonly _selectOptionsContainer: TemplateRef<void> | null = null;

  /**
   * @summary - Option children.
   *
   * @type {QueryList<AppSelectOptionComponent> | null}
   *
   * @private
   * @readonly
   */
  @ContentChildren(AppSelectOptionComponent)
  private readonly _childrenOptions: QueryList<AppSelectOptionComponent> | null = null;

  constructor(
    iconRegistryService: IconRegistryService,
    domSanitizer: DomSanitizer,
    overlayService: AppOverlayService,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Self() ngControl: NgControl
  ) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;
    this._overlayService = overlayService;
    this._changeDetectorRef = changeDetectorRef;
    this._ngControl = ngControl;

    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }

    this._initIconRegistry();
  }

  /**
   * @summary - Works together with CVA registerOnChange.
   *
   * @param {string} value - Value obtained by clicking on the option element.
   *
   * @private
   * @returns {void}
   */
  private _onChange(value: string): void {}

  /**
   * @summary - Works together with CVA registerOnChange.
   *
   * Update the form model on "blur".
   *
   * @private
   * @returns {void}
   */
  private _onTouched(): void {}

  /**
   * @summary - CVA method.
   *
   * @param {(value: string) => void} fn - Callback function assigned to the onChange method.
   *
   * @returns {void}
   * @public
   */
  public registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  /**
   * @summary - CVA method.
   *
   * @param {() => void} fn - Callback function assigned to the onChange method.
   *
   * @returns {void}
   * @public
   */
  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /**
   * @summary - CVA method.
   *
   * This method is called by the forms API, hence we don't manually call `this._onChange`.
   *
   * AKA @angular/forms.
   *
   * @param {string} value - Value selected.
   *
   * @returns {void}
   * @public
   */
  public writeValue(value: string): void {
    if (value === this._currentValue) {
      return;
    }

    this._currentValue = value;

    this._changeDetectorRef.markForCheck();
  }

  /**
   * @summary - Method used together with the click event from the `app-select-option` elements.
   *
   * @param {HandleOptionChangeOptions['value']} options.value - Value used for data.
   * @param {HandleOptionChangeOptions['textContent']} options.textContent - Visible value.
   *
   * @returns {void}
   * @public
   */
  public handleOptionChange(options: HandleOptionChangeOptions): void {
    const { value, textContent } = options;

    if (!this._overlayReference) {
      throw Error('Overlay reference not found!');
    }

    this._currentValue = value;
    this.currentValueTextContent = textContent;

    this._onChange(value);
    this._onTouched();

    this._changeDetectorRef.markForCheck();
    this._overlayReference.close();
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
        this._changeDetectorRef.markForCheck();
        this._overlayReference = null;

        this.focused = this._currentValue.length > 0;
      },
    });
  }

  /**
   * @summary - Check for duplicated options.
   *
   * @private
   */
  private _checkDuplicatedValues(): void {
    if (!this._childrenOptions) {
      return;
    }

    const VALUES = this._childrenOptions.map(item => item.value);

    const HAS_DUPLICATED_VALUES = VALUES.some(
      (item, index, self) => self.indexOf(item) !== index
    );

    if (HAS_DUPLICATED_VALUES) {
      throw Error('Duplicated values found for select options!');
    }
  }

  ngAfterContentInit() {
    this._checkDuplicatedValues();
  }
}
