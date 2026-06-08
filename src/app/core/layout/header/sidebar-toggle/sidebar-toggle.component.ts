import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SidebarService } from '@shared/services/sidebar/sidebar.service';

import {
  topBarAnimation,
  middleBarAnimation,
  bottomBarAnimation,
} from './sidebar-toggle-animations.component';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [topBarAnimation, middleBarAnimation, bottomBarAnimation],
})
export class SidebarToggleComponent {
  public readonly sidebarService: SidebarService;

  constructor(sidebarService: SidebarService) {
    this.sidebarService = sidebarService;
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

    this.sidebarService.toggleSidebar();
  }
}
