import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryService } from '@shared/components/icon/icon-registry.service';

import { type AppDialogOptions } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppDialogComponent implements AppDialogOptions {
  private readonly _iconRegistryService: IconRegistryService;
  private readonly _domSanitizer: DomSanitizer;

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: {
    [key: string]: string;
  } = {
    xmark: 'xmark',
  };

  public title: string = 'Please add your title!';
  public closeButton: boolean = true;

  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

    this._initIconRegistry();
  }

  /**
   * @summary - Clicking on the dynamically rendered button.
   *
   * @param {Event} event - Event object.
   *
   * @public
   * @returns {void}
   */
  handleButtonCloseClick(event: MouseEvent): void {
    event.stopPropagation();
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
}
