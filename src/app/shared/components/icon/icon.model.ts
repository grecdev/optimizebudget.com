import { SafeResourceUrl } from '@angular/platform-browser';

type SvgText = string | null;

class SvgIconConfig {
  url: SafeResourceUrl = '';
  svgText: SvgText = null;
  svgElement: SVGElement | null = null;

  constructor(url: SafeResourceUrl, svgText: SvgText) {
    this.url = url;
    this.svgText = svgText;
  }
}

interface AddSvgIconConfigOptions {
  name: string;
  url: SafeResourceUrl;
}

export type { AddSvgIconConfigOptions };
export { SvgIconConfig };
