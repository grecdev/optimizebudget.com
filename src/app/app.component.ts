import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

import { allRoutes } from '@script/globalData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss'],
  host: {
    '[id]': 'pageID',
  },
})
export class AppComponent implements OnInit {
  private readonly _router: Router;

  pageID: string = '';

  constructor(router: Router) {
    this._router = router;
  }

  private _setPageID(url: string) {
    const currentPath = url.substring(1);

    const pagesID = {
      '': 'home-page',
      [allRoutes.login.path]: 'login-page',
    };

    this.pageID = pagesID[currentPath as keyof typeof pagesID];
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe({
        next: (data) => {
          this._setPageID(data.url);
        },
      });
  }
}
