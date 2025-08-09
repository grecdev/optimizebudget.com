import { Component } from '@angular/core';

import { Route } from '@script/interfaces';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../sidebar.component.scss', './footer.component.scss'],
})
export class FooterComponent {
  links: Array<Route> = [
    {
      id: 0,
      path: '/get-help',
      textContent: 'Get Help',
      ariaLabel: 'Get Help page',
    },
    {
      id: 1,
      path: '/settings',
      textContent: 'Settings',
      ariaLabel: 'User Settings page',
    },
  ];

  trackByLinks(_index: number, link: Route) {
    return link.id;
  }
}
