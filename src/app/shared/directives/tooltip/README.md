# Tooltip Implementation

```typescript
// some.module.ts

import { NgModule } from '@angular/core';

import { TooltipModule } from '@shared/directives/tooltip/tooltip.module';

@NgModule({
  declarations: [
    //
  ],
  imports: [TooltipModule],
  exports: [
    //
  ],
})
export class SomeModule {
}
```

```angular2html
<!-- some.component.html -->

<div appTooltip="Tooltip message"></div>
```
