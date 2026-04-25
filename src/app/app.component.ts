import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

// import { MediaQueryService } from '@shared/services/media-query/media-query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-logged-in]': 'userIsLoggedIn',
  },
})
export class AppComponent {
  // private readonly _mediaQueryService: MediaQueryService;

  // private readonly _cleanupSubscriptions: Record<'mediaQueryService', Subscription> = {
  //   mediaQueryService: new Subscription(),
  // };

  // isMobile: boolean = false;

  userIsLoggedIn: boolean = true;
}
