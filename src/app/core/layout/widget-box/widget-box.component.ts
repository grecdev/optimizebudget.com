import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-widget-box',
  templateUrl: './widget-box.component.html',
  styleUrls: ['./widget-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'widget-box',
  },
})
export class WidgetBoxComponent {}
