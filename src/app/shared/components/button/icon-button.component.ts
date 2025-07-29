import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[appIconButton], a[appIconButton]',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {}
