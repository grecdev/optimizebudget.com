import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  type OnDestroy,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

import { Subscription, take } from 'rxjs';

import { IconRegistryService } from './icon-registry.service';

@Component({
  selector: 'app-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'img',
  },
})
export class IconComponent implements OnDestroy {
  private readonly _elementRef: ElementRef<HTMLElement> | null = null;
  private _iconRegistryService: IconRegistryService;
  private _renderer: Renderer2;

  private _subscriptions: Record<'iconRegistryService', Subscription> = {
    iconRegistryService: Subscription.EMPTY,
  };

  constructor(
    iconRegistryService: IconRegistryService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    this._iconRegistryService = iconRegistryService;
    this._elementRef = elementRef;
    this._renderer = renderer;

    iconRegistryService.renderer = renderer;
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

  /**
   * @summary - Render the SVG insie our host element
   * @param {SVGElement} svg - The SVGElement fetched from our assets
   *
   * @private
   * @returns {void}
   */
  private _renderSvg(svg: SVGElement) {
    const elementRef = this._elementRef && this._elementRef.nativeElement;

    if (!elementRef) {
      console.error('Element ref not found!');
      return;
    }

    this._renderer.appendChild(elementRef, svg);
  }

  /**
   * @summary - Fetch the icon and then transform it in a SVGElement
   *
   * @param {string} iconName - The icon's name
   *
   * @private
   * @returns {void}
   */
  private _fetchIcon(iconName: string) {
    this._subscriptions.iconRegistryService.unsubscribe();

    this._subscriptions.iconRegistryService = this._iconRegistryService
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

  ngOnDestroy() {
    this._subscriptions.iconRegistryService.unsubscribe();
  }
}
