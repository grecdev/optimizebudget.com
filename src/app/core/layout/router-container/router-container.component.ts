import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';

@Component({
  selector: 'app-router-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./router-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'router-container',
    '[class.remove-overflow]': '!_sidebarService.isClosed',
  },
})
export class RouterContainerComponent {
  public readonly _sidebarService: SidebarService;

  constructor(sidebarService: SidebarService) {
    this._sidebarService = sidebarService;
  }
}
