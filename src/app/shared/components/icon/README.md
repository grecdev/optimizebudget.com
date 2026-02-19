# Icon registry implementation

```typescript
// some.component.ts

import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {IconRegistryService} from '@shared/components/icon/icon-registry.service';

@Component({
  // ...
})
export class SomeComponent {
  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    'iconName': 'icon-name'
  };

  constructor(...args: Array<unknown>);
  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._initIconRegistry();
  }

  /**
   * @summary - Registry icons used in this component.
   *
   * @private
   * @returns {void}
   */
  private _initIconRegistry() {
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
```

```angular2html
<!-- some.component.html -->

<app-icon [svgIcon]="icons.someComponent"/>
```
