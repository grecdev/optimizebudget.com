import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { map, Observable, of, tap, throwError } from 'rxjs';

import { SvgIconConfig, type AddSvgIconConfigOptions } from './icon.model';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private _httpClient: HttpClient;
  private _svgIconConfigs = new Map<string, SvgIconConfig>();
  private _sanitizer: DomSanitizer;

  constructor(httpClient: HttpClient, sanitizer: DomSanitizer) {
    this._httpClient = httpClient;
    this._sanitizer = sanitizer;
  }

  /**
   * @summary Registers an icon config by name, used whenever we want to implement an icon
   *
   * @param {AddSvgIconConfigOptions} options - Required options to add the new SVG icon,
   *
   * @returns {void}
   */
  addSvgIconConfig(options: AddSvgIconConfigOptions) {
    const { name, url } = options;

    const newConfig = new SvgIconConfig(url, null);

    this._svgIconConfigs.set(name, newConfig);
  }

  /** @summary - After registering our icon, we need to expose it to our component
   *
   * @param {string} iconName - The icon name
   *
   * @returns {Observable<SVGElement>}
   */
  getSvg(iconName: string): Observable<SVGElement> {
    const config = this._svgIconConfigs.get(iconName);

    if (!config) {
      return throwError(() => Error(`${iconName} icon not found!`));
    }

    return this._getSvgFromConfig(config);
  }

  /**
   * @summary - Convert string to SVG element
   *
   * @param {SvgIconConfig} config - SVG config
   *
   * @private
   * @returns {SVGElement}
   */
  private _transformTextToSVGElement(config: SvgIconConfig): SVGElement {
    if (!config.svgElement) {
      const div = document.createElement('div');

      if (typeof config.svgText === 'string') {
        div.innerHTML = config.svgText;
      }

      const svg = document.querySelector('svg');

      if (!svg) {
        throw Error('<svg> tag not found!');
      }

      config.svgElement = svg;
    }

    return config.svgElement;
  }

  /**
   * @summary - Fetch the icon via URL path
   *
   * @param {SvgIconConfig} config - The SVG icon config
   *
   * @private
   * @returns {Observable<SVGElement>}
   */
  private _fetchIcon(config: SvgIconConfig): Observable<SVGElement> {
    const url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, config.url);

    if (!url) {
      return throwError(() => Error('Invalid URL sanitization'));
    }

    return this._httpClient
      .get(url, {
        responseType: 'text',
      })
      .pipe(
        tap(data => {
          config.svgText = data;
        }),
        map(() => {
          const finalSvgElement = this._transformTextToSVGElement(config);

          return finalSvgElement;
        })
      );
  }

  /**
   * @summary - Either fetch the icon from local directory or return in it from svg configs
   *
   * @param {SvgIconConfig} config - The SVG icon config
   *
   * @private
   * @returns {Observable<SVGElement>}
   */
  private _getSvgFromConfig(config: SvgIconConfig): Observable<SVGElement> {
    if (config.svgText) {
      const finalSvgElement = this._transformTextToSVGElement(config);

      return of(finalSvgElement);
    } else {
      return this._fetchIcon(config);
    }
  }
}
