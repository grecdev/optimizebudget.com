import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['../header.component.scss', './mobile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderComponent {}
