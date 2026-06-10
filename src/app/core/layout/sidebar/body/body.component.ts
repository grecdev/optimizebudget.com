import { ChangeDetectionStrategy, Component } from '@angular/core';

import { allRoutes } from '@script/globalData';
import { Route } from '@shared/models/interfaces';

@Component({
  selector: 'app-sidebar-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {
  links: Array<Route> = [
    allRoutes.overview,
    allRoutes.expenses,
    allRoutes.profitAndLoss,
    allRoutes.goals,
  ];

  trackByLinks(_index: number, link: Route) {
    return link.id;
  }
}
