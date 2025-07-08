import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly _router: Router;
  private readonly _activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    this._router = router;
    this._activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => {
        console.log(data);
      });
  }

  private _setPageID() {
  }
}
