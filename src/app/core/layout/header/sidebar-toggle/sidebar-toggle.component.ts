import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarToggleComponent {
  private readonly _sidebarService: SidebarService;

  constructor(sidebarService: SidebarService) {
    this._sidebarService = sidebarService;
  }

  /**
   * @summary - Click event handler to toggle the sidebar state.
   *
   * @param {MouseEvent} event - Event object.
   *
   * @public
   * @returns {void}
   */
  public handleSidebarToggle(event: MouseEvent): void {
    event.stopPropagation();

    this._sidebarService.toggleSidebar();
  }
}
