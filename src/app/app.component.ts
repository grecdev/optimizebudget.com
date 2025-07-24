import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';

// import { MediaQueryService } from '@shared/services/media-query/media-query.service';

import { allRoutes } from '@script/globalData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '[id]': 'pageID',
    '[attr.data-logged-in]': 'userIsLoggedIn',
  },
})
export class AppComponent implements OnInit {
  private readonly _router: Router;
  // private readonly _mediaQueryService: MediaQueryService;

  // private readonly _cleanupSubscriptions: Record<'mediaQueryService', Subscription> = {
  //   mediaQueryService: new Subscription(),
  // };

  pageID: string = '';
  userIsLoggedIn: boolean = true;

  // isMobile: boolean = false;

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
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe({
        next: data => {
          this._setPageID(data.url);
        },
      });
  }
}
