import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-router-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./router-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'router-container overflow-auto',
  },
})
export class RouterContainerComponent {}
