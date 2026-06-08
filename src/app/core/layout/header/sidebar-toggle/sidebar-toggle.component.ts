import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-toggle',
  templateUrl: './sidebar-toggle.component.html',
  styleUrls: ['./sidebar-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarToggleComponent {}
