import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';

import { IconRegistryService } from '@shared/components/icon/icon-registry.service';
import { DomSanitizer } from '@angular/platform-browser';

import { AppFormFieldControl } from '../form-field/form-field-control';

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
  /**
   * @summary - Icon registry service
   *
   * @type {IconRegistryService}
   * @private
   */
  private readonly _iconRegistryService: IconRegistryService;

  /**
   * @summary - Dom sanitizer
   *
   * @type {DomSanitizer}
   * @private
   */
  private readonly _domSanitizer: DomSanitizer;

  private readonly _viewContainerRef: ViewContainerRef;

  @ViewChild('selectOptionsContainer')
  private readonly _selectOptionsContainer: TemplateRef<HTMLDivElement> | null = null;

  public focused: boolean = false;

  @Input()
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _id: string = '';

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    'caret-down': 'caret-down',
  };

  constructor(
    iconRegistryService: IconRegistryService,
    domSanitizer: DomSanitizer,
    viewContainerRef: ViewContainerRef
  ) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;
    this._viewContainerRef = viewContainerRef;

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
    if (!this._selectOptionsContainer) {
      throw Error('_selectOptionsContainer not found!');
    }

    this.focused = true;

    this._viewContainerRef.createEmbeddedView(this._selectOptionsContainer);
  }
}
