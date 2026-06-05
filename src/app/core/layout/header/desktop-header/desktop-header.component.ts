import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['../header.component.scss', './desktop-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopHeaderComponent {}
