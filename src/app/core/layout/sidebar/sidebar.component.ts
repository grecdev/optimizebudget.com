import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    class: 'sidebar',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
