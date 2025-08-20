import { Component } from '@angular/core';

import { type Route } from '@script/interfaces';
import { allRoutes } from '@script/globalData';

@Component({
  selector: 'app-sidebar-body',
  templateUrl: './body.component.html',
  styleUrls: ['../sidebar.component.scss', './body.component.scss'],
})
export class BodyComponent {
  links: Array<Route> = [allRoutes.overview];

  trackByLinks(_index: number, link: Route) {
    return link.id;
  }
}
