import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-right-side',
  templateUrl: './right-side.component.html',
  styleUrls: ['../header.component.scss', './right-side.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSideComponent {}
