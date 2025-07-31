import { Injectable } from '@angular/core';

import { of } from 'rxjs';

import type { SvgIconConfig, AddSvgIconConfigOptions } from './icon.model';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  constructor() {}

  private _svgIconConfigs = new Map<string, SvgIconConfig>();

  getSvg(iconName: string) {
    return of('<svg></svg>');
  }

  /**
   * @summary Registers an icon config by name
   *
   * @param {AddSvgIconConfigOptions} options - Required options to add the new svg icon,
   *
   * @returns {void}
   */
  addSvgIconConfig(options: AddSvgIconConfigOptions) {
    const { name, config } = options;

    this._svgIconConfigs.set(name, config);
  }
}
