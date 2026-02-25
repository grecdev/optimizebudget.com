# Icon registry implementation

```typescript
// some.module.ts

import {NgModule} from '@angular/core';

import {AppIconModule} from '@shared/components/icon/icon.module';

@NgModule({
  declarations: [SomeComponent],
  imports: [AppIconModule],
  exports: [SomeComponent],
})
export class SomeModule {
}
```

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

  /**
   * @summary - Icons state.
   *
   * @type {Record<string, string>}
   * @public
   */
  public readonly icons: Record<string, string> = {
    'iconName': 'icon-name'
  };

  constructor(iconRegistryService: IconRegistryService, domSanitizer: DomSanitizer) {
    this._iconRegistryService = iconRegistryService;
    this._domSanitizer = domSanitizer;

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
