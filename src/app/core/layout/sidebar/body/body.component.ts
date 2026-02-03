import { Component } from '@angular/core';

import { allRoutes } from '@script/globalData';
import { Route } from '@shared/models/interfaces';

@Component({
  selector: 'app-sidebar-body',
  templateUrl: './body.component.html',
  styleUrls: ['../sidebar.component.scss', './body.component.scss'],
})
export class BodyComponent {
  links: Array<Route> = [allRoutes.overview, allRoutes.expenses];

  trackByLinks(_index: number, link: Route) {
    return link.id;
  }
}
