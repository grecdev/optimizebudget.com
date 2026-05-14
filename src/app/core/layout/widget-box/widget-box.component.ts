import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

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
export class WidgetBoxComponent {
  public readonly elementRef: ElementRef<HTMLElement> | null = null;

  constructor(elementRef: ElementRef<HTMLElement>) {
    this.elementRef = elementRef;
  }
}
