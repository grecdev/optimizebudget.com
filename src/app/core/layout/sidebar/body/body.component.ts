import { Component } from '@angular/core';

import { Route } from '@script/interfaces';

@Component({
  selector: 'app-sidebar-body',
  templateUrl: './body.component.html',
  styleUrls: ['../sidebar.component.scss', './body.component.scss'],
})
export class BodyComponent {
  links: Array<Route> = [
    {
      id: 0,
      textContent: 'Page 1',
      path: '/login',
      ariaLabel: 'Some page',
    },
    {
      id: 1,
      textContent: 'Page 2 (Active)',
      path: '/',
      ariaLabel: 'Some page',
    },
    {
      id: 2,
      textContent: 'Page 3',
      path: '/register',
      ariaLabel: 'Some page',
    },
  ];

  trackByLinks(_index: number, link: Route) {
    return link.id;
  }
}
