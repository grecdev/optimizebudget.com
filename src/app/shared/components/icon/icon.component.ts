import { Component, Input } from '@angular/core';

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
  @Input({ required: true }) get svgIcon(): string {
    return this._svgIcon;
  }

  set svgIcon(value: string) {
    if (value !== this._svgIcon) {
      if (value) {
        this._fetchIcon();
      }

      this._svgIcon = value;
    }
  }

  private _svgIcon: string = '';

  private _fetchIcon() {}
}
