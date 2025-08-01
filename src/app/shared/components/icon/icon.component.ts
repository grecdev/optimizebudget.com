import { Component, ElementRef, Input } from '@angular/core';

import { take } from 'rxjs';

import { IconRegistryService } from './icon-registry.service';

@Component({
  selector: 'app-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  private _iconRegistryService: IconRegistryService;
  private _elementRef: ElementRef<HTMLElement>;

  constructor(iconRegistryService: IconRegistryService, elementRef: ElementRef) {
    this._iconRegistryService = iconRegistryService;
    this._elementRef = elementRef;
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
    const elementRef = this._elementRef && this._elementRef.nativeElement;

    if (!elementRef) {
      console.error('Element ref not found!');
      return;
    }

    elementRef.appendChild(svg);
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
  }
}
