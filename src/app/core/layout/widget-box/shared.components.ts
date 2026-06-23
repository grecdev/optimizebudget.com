import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-widget-box-header',
  template: `
    <div class="header">
      <div class="title-container">
        <ng-content select="app-widget-box-title"></ng-content>
        <ng-content select="app-widget-box-title-info"></ng-content>
      </div>

      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-widget-box-header',
  },
})
class AppWidgetBoxHeader {}

@Component({
  selector: 'app-widget-box-title',
  template: `
    <h4>
      <ng-content></ng-content>
    </h4>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-widget-box-title',
  },
})
class AppWidgetBoxTitle {}

@Component({
  selector: 'app-widget-box-title-info',
  template: `
    <h5>
      <ng-content></ng-content>
    </h5>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-widget-box-title-info',
  },
})
class AppWidgetBoxTitleInfo {}

export { AppWidgetBoxHeader, AppWidgetBoxTitle, AppWidgetBoxTitleInfo };
