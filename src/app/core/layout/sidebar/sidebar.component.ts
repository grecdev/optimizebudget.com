import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sidebar',
  },
})
export class SidebarComponent {}
