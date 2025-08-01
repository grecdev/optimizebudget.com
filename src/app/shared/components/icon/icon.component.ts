import { Component, Input } from '@angular/core';

import { take } from 'rxjs';

import { IconRegistryService } from './icon-registry.service';

/**
 * https://hackernoon.com/efficient-svg-icon-management-in-angular-a-comprehensive-guide-using-angular-components
 * https://catalincodes.com/posts/one-way-of-building-an-svg-library
 * https://github.com/czeckd/angular-svg-icon/tree/master/projects/angular-svg-icon/src/lib
 */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  private _iconRegistryService: IconRegistryService;

  constructor(iconRegistryService: IconRegistryService) {
    this._iconRegistryService = iconRegistryService;
  }

  @Input({ required: true }) get svgIcon(): string {
    return this._svgIcon;
  }

  set svgIcon(value: string) {
    if (value !== this._svgIcon) {
      if (value) {
        this._fetchIcon(value);
      }

      this._svgIcon = value;
    }
  }

  private _svgIcon: string = '';

  private _renderSvg(svg: SVGElement) {
    console.log(svg);
  }

  private _fetchIcon(iconName: string) {
    this._iconRegistryService
      .getSvg(iconName)
      .pipe(take(1))
      .subscribe({
        next: data => {
          this._renderSvg(data);
        },
        error: error => {
          console.error(error);
        },
      });

    console.log('Fetch icon 😁', iconName);
  }
}
